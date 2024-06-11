const db = require('../config/db');

const Order = {
    create: (userId, address, phone, total_points, createdAt, updatedAt, callback) => {
        const query = 'INSERT INTO Orders (user_id, address, phone, total_points, status, created_at, updated_at) VALUES (?, ?, ?, ?, "packed", ?, ?)';
        db.query(query, [userId, address, phone, total_points, createdAt, updatedAt], callback);
    },
    addOrderItem: (orderId, productId, quantity, callback) => {
        const query = 'INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (?, ?, ?)';
        db.query(query, [orderId, productId, quantity], callback);
    },
    updateStatus: (orderId, status, updatedAt, callback) => {
        const query = 'UPDATE Orders SET status = ?, updated_at = ? WHERE order_id = ?';
        db.query(query, [status, updatedAt, orderId], callback);
    },
    getOrderById: (orderId, callback) => {
        const query = 'SELECT * FROM Orders WHERE order_id = ?';
        db.query(query, [orderId], callback);
    },
    getOrderHistoryByUser: (userId, callback) => {
        const query = `
            SELECT 
                orders.created_at, 
                orders.address, 
                orders.total_points AS total_points_order,
                orders.status, 
                GROUP_CONCAT(products.name SEPARATOR ', ') AS products,
                SUM(orderitems.total_points) AS total_points_used
            FROM orders
            JOIN orderitems ON orders.order_id = orderitems.order_id
            JOIN products ON orderitems.product_id = products.product_id
            WHERE orders.user_id = ?
            GROUP BY orders.order_id
            ORDER BY orders.created_at DESC
        `;
        db.query(query, [userId], callback);
    }
};

module.exports = Order;
