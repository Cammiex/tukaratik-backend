const db = require('../config/db');

const Transaction = {
    create: (userId, productId, quantity, pointsSpent, callback) => {
        const query = 'INSERT INTO Transactions (user_id, product_id, quantity, points_spent) VALUES (?, ?, ?, ?)';
        db.query(query, [userId, productId, quantity, pointsSpent], callback);
    },
    getByUserId: (userId, callback) => {
        const query = 'SELECT * FROM Transactions WHERE user_id = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = Transaction;
