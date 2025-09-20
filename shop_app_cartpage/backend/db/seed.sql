-- Users
INSERT INTO users (user_id, name, phone, membership) VALUES
('alice@gmail.com', 'Alice', '010-1111-2222', 'GOLD'),
('bob@gmail.com', 'Bob', '010-3333-4444', 'SILVER'),
('carol@gmail.com', 'Carol', '010-5555-6666', 'GOLD'),
('dana@gmail.com', 'Dana', '010-7777-8888', 'VIP');

-- Products
INSERT INTO products (name, price, image_url, stock) VALUES
('살안타 셔츠', 40000, 'https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/f164/7a77655558857e944b4155fccb61360fbb246e2038f416bac85729baf4f6.jpg', 3),
('핏존예 슬랙스', 30000, 'https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/a72b/9208e87977ae5e65ccf5e18a25f20f0a2dda8c9fcb5612eb1e57dfddda93.jpg', 3),
('꾸안꾸 크롭티', 20000, 'https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/rs_quotation_api/j9iveues/7d4c5f6fcf7b4e8e963b6361cacec1d8.jpg', 3),
('쿨링 와이드 데님', 50000, 'https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/b74e/7300bbe1c46662126a78305edf515c85506f593a8324527d1b29fe04197f.jpg', 3);

-- Cart
INSERT INTO cart (user_id, product_id, quantity) VALUES
('alice@gmail.com', 1, 1),
('alice@gmail.com', 2, 1),
('alice@gmail.com', 3, 1),
('alice@gmail.com', 4, 1);
