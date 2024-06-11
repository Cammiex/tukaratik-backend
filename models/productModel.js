const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, callback);
    },
    create: (name, description, points_required, weight, stock, image_path, callback) => {
        const query = 'INSERT INTO products (name, description, points_required, weight, stock, image_path) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [name, description, points_required, weight, stock, image_path], callback);
    },
    update: (id, name, description, points_required, weight, stock, image_path, callback) => {
        const query = 'UPDATE products SET name = ?, description = ?, points_required = ?, weight = ?, stock = ?, image_path = ? WHERE product_id = ?';
        db.query(query, [name, description, points_required, weight, stock, image_path, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM products WHERE product_id = ?';
        db.query(query, [id], callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM products WHERE product_id = ?';
        db.query(query, [id], callback);
    },
    search: (name, callback) => {
        const query = 'SELECT * FROM products WHERE name LIKE ?';
        db.query(query, [`%${name}%`], callback);
    },
    sort: (column, order, callback) => {
        const validColumns = ['name', 'description', 'points_required', 'weight', 'stock']; // Valid columns
        const validOrders = ['ASC', 'DESC']; // Valid orders
        if (!validColumns.includes(column) || !validOrders.includes(order)) {
            return callback(new Error('Invalid column or order'));
        }
        const query = `SELECT * FROM products ORDER BY ?? ${order}`;
        console.log('Executing query:', query, [column]); // Log query
        db.query(query, [column], callback);
    },
    updateStock: (id, stock, callback) => {
        const query = 'UPDATE products SET stock = ? WHERE product_id = ?';
        db.query(query, [stock, id], callback);
    },
    reduceStock: (productId, quantity, callback) => {
        const query = 'UPDATE Products SET stock = stock - ? WHERE product_id = ?';
        db.query(query, [quantity, productId], callback);
    },
};

module.exports = Product;