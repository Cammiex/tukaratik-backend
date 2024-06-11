const db = require('../config/db');

const Cart = {
    addItem: (userId, productId, quantity, callback) => {
        const query = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?';
        db.query(query, [userId, productId, quantity, quantity], callback);
    },
    updateQuantity: (userId, productId, quantity, callback) => {
        const query = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?';
        db.query(query, [quantity, userId, productId], callback);
    },
    getItems: (userId, callback) => {
        const query = `
            SELECT p.*, c.quantity, (p.points_required * c.quantity) AS total_points
            FROM cart c
            JOIN Products p ON c.product_id = p.product_id
            WHERE c.user_id = ?`;
        db.query(query, [userId], callback);
    },
    deleteItem: (userId, productId, callback) => {
        const query = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?';
        db.query(query, [userId, productId], callback);
    },
    clearCart: (userId, callback) => {
        const query = 'DELETE FROM cart WHERE user_id = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = Cart;
