CREATE DATABASE IF NOT EXISTS hoku_cafe;

USE hoku_cafe;

CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500) NOT NULL,
  alt VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_menu_item_name (name)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO menu_items (name, description, price, image, alt, category)
VALUES
  (
    'Hoku Iced Latte',
    'Espresso, chilled milk, vanilla, and a clean creamy finish.',
    165.00,
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80',
    'Iced coffee in a clear glass',
    'Coffee'
  ),
  (
    'Matcha Latte',
    'Ceremonial matcha, creamy milk, and a soft earthy sweetness.',
    155.00,
    'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=900&q=80',
    'Green matcha latte in a cup',
    'Tea'
  ),
  (
    'Brownies',
    'Soft-baked cookies with crisp edges and rich chocolate chunks.',
    85.00,
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
    'Fresh chocolate chip cookies',
    'Pastry'
  );
