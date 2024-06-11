const db = require('../config/db');

const User = {
    create: (username, passwordHash, email, callback) => {
        const query = 'INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)';
        db.query(query, [username, passwordHash, email], callback);
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },
    findById: (userId, callback) => {
        const query = 'SELECT * FROM users WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    delete: (userId, callback) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, callback);
    },
    getTotalPoints: (userId, callback) => {
        const query = 'SELECT total_points FROM users WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    updatePoints: (userId, points, callback) => {
        const query = 'UPDATE users SET total_points = total_points + ? WHERE user_id = ?';
        db.query(query, [points, userId], callback);
    }
};

module.exports = User;
