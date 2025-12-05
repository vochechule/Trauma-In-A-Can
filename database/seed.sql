-- Seed data for products table
-- This file can be run to populate the database with initial data

INSERT INTO products (name, description, price, category, stock_quantity, image_url) VALUES
('Laptop HP EliteBook', 'High-performance business laptop with 16GB RAM and 512GB SSD', 1299.99, 'Electronics', 15, 'https://via.placeholder.com/300x300?text=HP+Laptop'),
('Wireless Mouse Logitech MX Master 3', 'Ergonomic wireless mouse with precision scrolling', 99.99, 'Electronics', 50, 'https://via.placeholder.com/300x300?text=Logitech+Mouse'),
('Mechanical Keyboard Keychron K2', 'Compact 75% wireless mechanical keyboard', 89.99, 'Electronics', 30, 'https://via.placeholder.com/300x300?text=Keyboard'),
('Monitor Dell UltraSharp 27"', '4K UHD monitor with excellent color accuracy', 499.99, 'Electronics', 20, 'https://via.placeholder.com/300x300?text=Dell+Monitor'),
('USB-C Hub Anker PowerExpand', '7-in-1 USB-C hub with HDMI and card readers', 49.99, 'Electronics', 100, 'https://via.placeholder.com/300x300?text=USB+Hub'),
('Webcam Logitech C920', 'Full HD 1080p webcam for video calls', 79.99, 'Electronics', 45, 'https://via.placeholder.com/300x300?text=Webcam'),
('Headphones Sony WH-1000XM5', 'Premium noise-cancelling wireless headphones', 399.99, 'Electronics', 25, 'https://via.placeholder.com/300x300?text=Headphones'),
('Desk Chair Herman Miller Aeron', 'Ergonomic office chair with lumbar support', 1495.00, 'Furniture', 8, 'https://via.placeholder.com/300x300?text=Office+Chair'),
('Standing Desk Autonomous SmartDesk', 'Electric height-adjustable standing desk', 499.00, 'Furniture', 12, 'https://via.placeholder.com/300x300?text=Standing+Desk'),
('Desk Lamp BenQ ScreenBar', 'Monitor light bar with auto-dimming', 109.99, 'Electronics', 35, 'https://via.placeholder.com/300x300?text=Desk+Lamp'),
('Backpack Thule EnRoute', 'Durable laptop backpack with 23L capacity', 129.99, 'Accessories', 40, 'https://via.placeholder.com/300x300?text=Backpack'),
('Water Bottle Hydro Flask', 'Insulated stainless steel water bottle 32oz', 44.95, 'Accessories', 80, 'https://via.placeholder.com/300x300?text=Water+Bottle'),
('Notebook Moleskine Classic', 'Premium hardcover notebook with ruled pages', 24.99, 'Stationery', 150, 'https://via.placeholder.com/300x300?text=Notebook'),
('Pen Set Parker Jotter', 'Classic ballpoint pen set with premium ink', 39.99, 'Stationery', 60, 'https://via.placeholder.com/300x300?text=Pen+Set'),
('Whiteboard Quartet', 'Magnetic dry-erase whiteboard 4x3 feet', 89.99, 'Office Supplies', 18, 'https://via.placeholder.com/300x300?text=Whiteboard'),
('Desk Organizer Umbra', 'Modern desk organizer with multiple compartments', 34.99, 'Office Supplies', 55, 'https://via.placeholder.com/300x300?text=Desk+Organizer'),
('Coffee Maker Nespresso', 'Compact espresso machine with milk frother', 179.99, 'Appliances', 22, 'https://via.placeholder.com/300x300?text=Coffee+Maker'),
('Smart Speaker Amazon Echo Dot', 'Alexa-enabled smart speaker with clock', 59.99, 'Electronics', 90, 'https://via.placeholder.com/300x300?text=Echo+Dot'),
('Phone Stand Twelve South', 'Adjustable stand for smartphones and tablets', 49.99, 'Accessories', 70, 'https://via.placeholder.com/300x300?text=Phone+Stand'),
('Cable Management Kit', 'Complete cable management solution for desk setup', 29.99, 'Office Supplies', 120, 'https://via.placeholder.com/300x300?text=Cable+Kit')
ON CONFLICT DO NOTHING;
