'''
Business: Административное API для управления товарами (создание, редактирование, удаление)
Args: event - dict с httpMethod, body, headers с X-Admin-Token
      context - object с request_id
Returns: HTTP response с результатом операции
'''

import json
import os
import psycopg2
from typing import Dict, Any, Optional

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def verify_admin_token(headers: Dict[str, str]) -> bool:
    admin_token = os.environ.get('ADMIN_TOKEN')
    if not admin_token:
        return False
    
    provided_token = headers.get('X-Admin-Token') or headers.get('x-admin-token')
    return provided_token == admin_token

def create_product(data: Dict[str, Any]) -> int:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """INSERT INTO products 
                   (name, category, price, image_url, glow_color, description)
                   VALUES (%s, %s, %s, %s, %s, %s) RETURNING id""",
                (
                    data['name'],
                    data['category'],
                    data['price'],
                    data['image_url'],
                    data.get('glow_color', 'blue'),
                    data.get('description', '')
                )
            )
            product_id = cur.fetchone()[0]
            conn.commit()
            return product_id
    finally:
        conn.close()

def update_product(product_id: int, data: Dict[str, Any]) -> bool:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """UPDATE products 
                   SET name = %s, category = %s, price = %s, 
                       image_url = %s, glow_color = %s, description = %s,
                       updated_at = CURRENT_TIMESTAMP
                   WHERE id = %s""",
                (
                    data['name'],
                    data['category'],
                    data['price'],
                    data['image_url'],
                    data.get('glow_color', 'blue'),
                    data.get('description', ''),
                    product_id
                )
            )
            conn.commit()
            return cur.rowcount > 0
    finally:
        conn.close()

def delete_product(product_id: int) -> bool:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
            conn.commit()
            return cur.rowcount > 0
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            product_id = create_product(body)
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'product_id': product_id,
                    'message': 'Product created'
                })
            }
        
        elif method == 'PUT':
            params = event.get('queryStringParameters', {}) or {}
            product_id = params.get('id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Product ID required'})
                }
            
            body = json.loads(event.get('body', '{}'))
            updated = update_product(int(product_id), body)
            
            if not updated:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Product updated'
                })
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {}) or {}
            product_id = params.get('id')
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Product ID required'})
                }
            
            deleted = delete_product(int(product_id))
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Product not found'})
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'Product deleted'
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
