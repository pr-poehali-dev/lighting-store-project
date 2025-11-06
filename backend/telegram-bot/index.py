'''
Business: Telegram бот для автоматической публикации товаров, фото и видео на сайт
Args: event - dict с httpMethod, body от Telegram webhook
      context - object с request_id, function_name
Returns: HTTP response для Telegram
'''

import json
import os
import psycopg2
from typing import Dict, Any, Optional
from datetime import datetime

ALLOWED_PHONE = "+79222142996"

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def is_authorized_user(telegram_user_id: int, phone: Optional[str] = None) -> bool:
    if phone and phone.replace('-', '').replace(' ', '') == ALLOWED_PHONE.replace('-', '').replace(' ', ''):
        return True
    
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT COUNT(*) FROM telegram_messages WHERE telegram_user_id = %s AND phone_number = %s",
                (telegram_user_id, ALLOWED_PHONE)
            )
            result = cur.fetchone()
            return result[0] > 0
    finally:
        conn.close()

def save_telegram_message(data: Dict[str, Any]) -> int:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """INSERT INTO telegram_messages 
                   (telegram_user_id, phone_number, message_type, message_text, file_url, file_id)
                   VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
                (
                    data['telegram_user_id'],
                    data.get('phone_number'),
                    data['message_type'],
                    data.get('message_text'),
                    data.get('file_url'),
                    data.get('file_id')
                )
            )
            message_id = cur.fetchone()[0]
            conn.commit()
            return message_id
    finally:
        conn.close()

def create_product_from_message(message_id: int, message_data: Dict[str, Any]) -> Optional[int]:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            text = message_data.get('message_text', '')
            lines = text.split('\n')
            
            name = lines[0] if len(lines) > 0 else 'Новый товар'
            price = 0
            category = 'interior'
            description = ''
            
            for line in lines[1:]:
                line_lower = line.lower().strip()
                if 'цена' in line_lower or 'price' in line_lower:
                    try:
                        price = int(''.join(filter(str.isdigit, line)))
                    except:
                        pass
                elif 'категория' in line_lower or 'category' in line_lower:
                    if 'ландшафт' in line_lower or 'landscape' in line_lower:
                        category = 'landscape'
                else:
                    description += line + '\n'
            
            image_url = message_data.get('file_url', 'https://placehold.co/400x300')
            
            cur.execute(
                """INSERT INTO products 
                   (name, category, price, image_url, description)
                   VALUES (%s, %s, %s, %s, %s) RETURNING id""",
                (name, category, price, image_url, description.strip())
            )
            product_id = cur.fetchone()[0]
            
            cur.execute(
                "UPDATE telegram_messages SET processed = TRUE, product_id = %s WHERE id = %s",
                (product_id, message_id)
            )
            
            conn.commit()
            return product_id
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

def send_telegram_message(chat_id: int, text: str, bot_token: str):
    import urllib.request
    import urllib.parse
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data)
    urllib.request.urlopen(req)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({
                'status': 'ok',
                'bot': 'Telegram Bot Active',
                'allowed_phone': ALLOWED_PHONE
            })
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        if not bot_token:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Bot token not configured'})
            }
        
        update = json.loads(event.get('body', '{}'))
        
        if 'message' not in update:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True})
            }
        
        message = update['message']
        chat_id = message['chat']['id']
        user_id = message['from']['id']
        
        phone = None
        if 'contact' in message:
            phone = message['contact']['phone_number']
            if not phone.startswith('+'):
                phone = '+' + phone
            
            save_telegram_message({
                'telegram_user_id': user_id,
                'phone_number': phone,
                'message_type': 'text',
                'message_text': 'Shared contact'
            })
            
            if phone.replace('-', '').replace(' ', '') == ALLOWED_PHONE.replace('-', '').replace(' ', ''):
                send_telegram_message(
                    chat_id,
                    '✅ <b>Доступ разрешен!</b>\n\nТеперь вы можете публиковать товары.\n\n'
                    '<b>Как добавить товар:</b>\n'
                    '1. Отправьте фото товара\n'
                    '2. В описании укажите:\n'
                    '   • Название (первая строка)\n'
                    '   • Цена: 15000\n'
                    '   • Категория: интерьер/ландшафт\n'
                    '   • Описание товара',
                    bot_token
                )
            else:
                send_telegram_message(
                    chat_id,
                    '❌ <b>Доступ запрещен</b>\n\nВаш номер телефона не авторизован.',
                    bot_token
                )
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True})
            }
        
        if not is_authorized_user(user_id, phone):
            send_telegram_message(
                chat_id,
                '❌ <b>Доступ запрещен</b>\n\n'
                'Отправьте ваш контакт для авторизации.\n'
                f'Разрешенный номер: {ALLOWED_PHONE}',
                bot_token
            )
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True})
            }
        
        message_data = {
            'telegram_user_id': user_id,
            'phone_number': ALLOWED_PHONE,
            'message_type': 'text',
            'message_text': message.get('text', message.get('caption', ''))
        }
        
        if 'photo' in message:
            message_data['message_type'] = 'photo'
            photos = message['photo']
            largest_photo = max(photos, key=lambda p: p['file_size'])
            message_data['file_id'] = largest_photo['file_id']
            message_data['file_url'] = f"https://api.telegram.org/file/bot{bot_token}/{largest_photo['file_id']}"
        
        elif 'video' in message:
            message_data['message_type'] = 'video'
            message_data['file_id'] = message['video']['file_id']
            message_data['file_url'] = f"https://api.telegram.org/file/bot{bot_token}/{message['video']['file_id']}"
        
        elif 'document' in message:
            message_data['message_type'] = 'document'
            message_data['file_id'] = message['document']['file_id']
            message_data['file_url'] = f"https://api.telegram.org/file/bot{bot_token}/{message['document']['file_id']}"
        
        message_id = save_telegram_message(message_data)
        
        if message_data['message_type'] in ['photo', 'video']:
            product_id = create_product_from_message(message_id, message_data)
            send_telegram_message(
                chat_id,
                f'✅ <b>Товар добавлен!</b>\n\n'
                f'ID: {product_id}\n'
                f'Название: {message_data["message_text"].split(chr(10))[0] if message_data["message_text"] else "Новый товар"}\n\n'
                f'Товар опубликован на сайте.',
                bot_token
            )
        else:
            send_telegram_message(
                chat_id,
                '📝 <b>Сообщение сохранено</b>\n\n'
                'Чтобы создать товар, отправьте фото с описанием.',
                bot_token
            )
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }
