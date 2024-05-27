const db = require('../config/db');

const Cart = {
    getAll: (userId, callback) => {
        const query = 'SELECT * FROM Cart WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    add: (userId, productId, quantity, callback) => {
        const query = 'INSERT INTO Cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
        db.query(query, [userId, productId, quantity], callback);
    },
    update: (id, quantity, callback) => {
        const query = 'UPDATE Cart SET quantity = ? WHERE cart_id = ?';
        db.query(query, [quantity, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Cart WHERE cart_id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Cart;
