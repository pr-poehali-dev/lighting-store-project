'''
Business: API для управления настройками сайта через админ-панель
Args: event - dict с httpMethod, body, headers с X-Admin-Token
      context - object с request_id
Returns: HTTP response с настройками или статусом операции
'''

import json
import os
import psycopg2
from typing import Dict, Any

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def verify_admin_token(headers: Dict[str, str]) -> bool:
    admin_token = os.environ.get('ADMIN_TOKEN')
    if not admin_token:
        return False
    
    provided_token = headers.get('X-Admin-Token') or headers.get('x-admin-token')
    return provided_token == admin_token

def get_settings() -> Dict[str, Any]:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT key, value FROM site_settings ORDER BY key"
            )
            rows = cur.fetchall()
            
            settings = {}
            for row in rows:
                try:
                    settings[row[0]] = json.loads(row[1])
                except:
                    settings[row[0]] = row[1]
            
            return settings
    finally:
        conn.close()

def save_settings(settings: Dict[str, Any]) -> bool:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            for key, value in settings.items():
                value_str = json.dumps(value) if not isinstance(value, str) else value
                
                cur.execute(
                    """INSERT INTO site_settings (key, value)
                       VALUES (%s, %s)
                       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP""",
                    (key, value_str)
                )
            
            conn.commit()
            return True
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    headers = event.get('headers', {})
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if not verify_admin_token(headers):
        return {
            'statusCode': 401,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Unauthorized',
                'message': 'Invalid or missing admin token'
            })
        }
    
    try:
        if method == 'GET':
            settings = get_settings()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'settings': settings
                })
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            settings = body.get('settings', {})
            
            if not settings:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Settings object required'})
                }
            
            save_settings(settings)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Settings saved'
                })
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
