const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        const query = 'SELECT * FROM Products';
        db.query(query, callback);
    },
    create: (name, description, points_required, stock, weight, image_url, callback) => {
        const query = 'INSERT INTO Products (name, description, points_required, stock, weight, image_url) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [name, description, points_required, stock, weight, image_url], callback);
    },
    update: (id, name, description, points_required, stock, weight, image_url, callback) => {
        const query = 'UPDATE Products SET name = ?, description = ?, points_required = ?, stock = ?, weight = ?, image_url = ? WHERE product_id = ?';
        db.query(query, [name, description, points_required, stock, weight, image_url, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Products WHERE product_id = ?';
        db.query(query, [id], callback);
    },
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
