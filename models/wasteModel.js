const db = require('../config/db');

const Waste = {
    getAll: (callback) => {
        const query = 'SELECT * FROM Waste';
        db.query(query, callback);
    },
    create: (user_id, location, address, weight, waste_type, image_url, points_awarded, callback) => {
        const query = 'INSERT INTO Waste (user_id, location, address, weight, waste_type, image_url, points_awarded) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [user_id, location, address, weight, waste_type, image_url, points_awarded], callback);
    },
    update: (id, user_id, location, address, weight, waste_type, image_url, points_awarded, callback) => {
        console.log('Executing Update Query with:', id, user_id, location, address, weight, waste_type, image_url, points_awarded);
        const query = 'UPDATE Waste SET user_id = ?, location = ?, address = ?, weight = ?, waste_type = ?, image_url = ?, points_awarded = ? WHERE waste_id = ?';
        db.query(query, [user_id, location, address, weight, waste_type, image_url, points_awarded, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Waste WHERE waste_id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Waste;
