-- 모든 회원 조회
SELECT * FROM users;

-- 모든 상품 조회
SELECT * FROM products;

-- 특정 회원 장바구니 조회
SELECT c.cart_id, u.name AS user_name, p.name AS product_name, 
       c.quantity, (p.price * c.quantity) AS total_price
FROM cart c
JOIN users u ON c.user_id = u.user_id
JOIN products p ON c.product_id = p.product_id
WHERE c.user_id = 'alice@gmail.com';
