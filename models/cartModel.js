const db = require('../config/db');

const Cart = {
    addItem: (userId, productId, quantity, callback) => {
        const query = 'INSERT INTO Cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
        db.query(query, [userId, productId, quantity], callback);
    }
};

module.exports = Cart;