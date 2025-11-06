'''
Business: API для получения списка товаров из базы данных
Args: event - dict с httpMethod, queryStringParameters
      context - object с request_id
Returns: JSON список товаров или детали товара
'''

import json
import os
import psycopg2
from typing import Dict, Any, List

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def get_all_products(category: str = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            if category and category != 'all':
                cur.execute(
                    """SELECT id, name, category, price, image_url, glow_color, description, created_at
                       FROM products WHERE category = %s ORDER BY created_at DESC""",
                    (category,)
                )
            else:
                cur.execute(
                    """SELECT id, name, category, price, image_url, glow_color, description, created_at
                       FROM products ORDER BY created_at DESC"""
                )
            
            rows = cur.fetchall()
            products = []
            for row in rows:
                products.append({
                    'id': row[0],
                    'name': row[1],
                    'category': row[2],
                    'price': row[3],
                    'image': row[4],
                    'glow': row[5],
                    'description': row[6],
                    'created_at': row[7].isoformat() if row[7] else None
                })
            return products
    finally:
        conn.close()

def get_product_by_id(product_id: int) -> Dict[str, Any]:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """SELECT id, name, category, price, image_url, glow_color, description, created_at
                   FROM products WHERE id = %s""",
                (product_id,)
            )
            row = cur.fetchone()
            if not row:
                return None
            
            return {
                'id': row[0],
                'name': row[1],
                'category': row[2],
                'price': row[3],
                'image': row[4],
                'glow': row[5],
                'description': row[6],
                'created_at': row[7].isoformat() if row[7] else None
            }
    finally:
        conn.close()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        params = event.get('queryStringParameters', {}) or {}
        product_id = params.get('id')
        category = params.get('category')
        
        if product_id:
            product = get_product_by_id(int(product_id))
            if not product:
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
                'body': json.dumps(product)
            }
        
        products = get_all_products(category)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'products': products,
                'count': len(products)
            })
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
