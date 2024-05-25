const db = require('../config/db');

const User = {
    create: (username, passwordHash, email, callback) => {
        const query = 'INSERT INTO Users (username, password_hash, email) VALUES (?, ?, ?)';
        db.query(query, [username, passwordHash, email], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM Users WHERE email = ?';
        db.query(query, [email], callback);
    }
};

module.exports = User;
