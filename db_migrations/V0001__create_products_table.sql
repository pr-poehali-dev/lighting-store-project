CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('interior', 'landscape')),
    price INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    glow_color VARCHAR(20) DEFAULT 'blue' CHECK (glow_color IN ('blue', 'purple', 'orange')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telegram_messages (
    id SERIAL PRIMARY KEY,
    telegram_user_id BIGINT NOT NULL,
    phone_number VARCHAR(20),
    message_type VARCHAR(20) NOT NULL CHECK (message_type IN ('text', 'photo', 'video', 'document')),
    message_text TEXT,
    file_url TEXT,
    file_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed BOOLEAN DEFAULT FALSE,
    product_id INTEGER REFERENCES products(id)
);

CREATE INDEX idx_telegram_user_id ON telegram_messages(telegram_user_id);
CREATE INDEX idx_processed ON telegram_messages(processed);
CREATE INDEX idx_products_category ON products(category);
