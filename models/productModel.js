const db = require('../config/db');

const Product = {
    findById: (productId, callback) => {
        const query = 'SELECT * FROM Products WHERE product_id = ?';
        db.query(query, [productId], callback);
    },
    updateStock: (productId, quantity, callback) => {
        const query = 'UPDATE Products SET stock = stock - ? WHERE product_id = ?';
        db.query(query, [quantity, productId], callback);
    }
};

module.exports = Product;