const db = require('../config/db');

const User = {
    create: (username, passwordHash, email, callback) => {
        const query = 'INSERT INTO Users (username, password_hash, email) VALUES (?, ?, ?)';
        db.query(query, [username, passwordHash, email], callback);
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM Users WHERE username = ?';
        db.query(query, [username], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM Users WHERE email = ?';
        db.query(query, [email], callback);
    },
    findById: (userId, callback) => {
        const query = 'SELECT * FROM Users WHERE user_id = ?';
        db.query(query, [userId], callback);
    },
    updatePoints: (userId, points, callback) => {
        const query = 'UPDATE Users SET total_points = total_points + ? WHERE user_id = ?';
        db.query(query, [points, userId], callback);
    }
};

module.exports = User;
