const Waste = require('../models/wasteModel');
const User = require('../models/userModel');

exports.getAllWaste = (req, res) => {
    Waste.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

exports.addWaste = (req, res) => {
    const { user_id, location, address, weight, waste_type, image_url, points_awarded } = req.body;
    
    console.log('Request Body:', req.body);

    if (!user_id || !location || !address || !weight || !waste_type || !points_awarded) {
        return res.status(400).send('All fields are required');
    }

    Waste.create(user_id, location, address, weight, waste_type, image_url, points_awarded, (err, results) => {
        if (err) return res.status(500).send(err);

        User.updatePoints(user_id, points_awarded, (err, updateResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating user points');
            }
            
            res.status(201).send('Waste added successfully and user points updated');
        });
    });
};

exports.updateWaste = (req, res) => {
    const { user_id, location, address, weight, waste_type, image_url, points_awarded } = req.body;

    console.log('Update Waste Request Body:', req.body);

    if (!user_id || !location || !address || !weight || !waste_type || !points_awarded) {
        return res.status(400).send('All fields are required');
    }

    Waste.update(req.params.id, user_id, location, address, weight, waste_type, image_url, points_awarded, (err, results) => {
        if (err) {
            console.error('Error updating waste:', err);
            return res.status(500).send('Error updating waste');
        }
        res.status(200).send('Waste updated successfully');
    });
};

exports.deleteWaste = (req, res) => {
    Waste.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Waste deleted successfully');
    });
};
