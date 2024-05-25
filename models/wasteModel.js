const db = require('../config/db');

const Waste = {
    create: (userId, location, address, weight, wasteType, photoPath, pointsAwarded, callback) => {
        const query = 'INSERT INTO Waste (user_id, location, address, weight, waste_type, photo_path, points_awarded) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [userId, location, address, weight, wasteType, photoPath, pointsAwarded], callback);
    }
};

module.exports = Waste;