const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'viaduct.proxy.rlwy.net',
    user: 'root',
    password: 'SPmRGjTjQxXWHpbfQNvCbMSsKjaYGLBb',
    database: 'tukaratik',
    port: 41507
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

module.exports = db;
