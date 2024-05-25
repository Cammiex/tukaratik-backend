const Waste = require('../models/wasteModel');
const User = require('../models/userModel');

exports.submitWaste = (req, res) => {
    const { userId, location, address, weight, wasteType, photoPath } = req.body;
    const pointsAwarded = Math.floor(weight * 10); // Misalkan 10 poin per kilogram

    Waste.create(userId, location, address, weight, wasteType, photoPath, pointsAwarded, (err, results) => {
        if (err) return res.status(500).send(err);

        User.updatePoints(userId, pointsAwarded, (err, results) => {
            if (err) return res.status(500).send(err);
            res.send('Waste submitted and points awarded successfully');
        });
    });
};