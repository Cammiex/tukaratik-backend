const Waste = require('../models/wasteModel');
const User = require('../models/userModel');

exports.getAllWaste = (req, res) => {
    Waste.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

const calculatePoints = (weight) => {
    const pointsPerKg = 50;
    return weight * pointsPerKg;
};

exports.addWaste = (req, res) => {
    const { user_id, location, address, weight, waste_type, image_url } = req.body;

    if (!user_id || !location || !address || !weight || !waste_type) {
        return res.status(400).send('All fields are required');
    }

    const points_awarded = calculatePoints(weight);

    Waste.create(user_id, location, address, weight, waste_type, image_url, points_awarded, (err, results) => {
        if (err) return res.status(500).send(err);

        res.status(201).send('Waste added successfully');
    });
};

exports.updateWaste = (req, res) => {
    const { user_id, location, address, weight, waste_type, image_url, points_awarded, shipping_status } = req.body;

    if (!user_id || !location || !address || !weight || !waste_type || !points_awarded || !shipping_status) {
        return res.status(400).send('All fields are required');
    }

    Waste.update(req.params.id, user_id, location, address, weight, waste_type, image_url, points_awarded, shipping_status, (err, results) => {
        if (err) return res.status(500).send('Error updating waste');
        
        // Jika status pengiriman selesai, update poin user
        if (shipping_status === 'Completed') {
            Waste.getWasteById(req.params.id, (err, wasteResults) => {
                if (err) return res.status(500).send(err);

                const waste = wasteResults[0];
                User.updatePoints(waste.user_id, waste.points_awarded, (err, updateResult) => {
                    if (err) return res.status(500).send('Error updating user points');
                    res.status(200).send('Waste updated successfully and user points updated');
                });
            });
        } else {
            res.status(200).send('Waste updated successfully');
        }
    });
};

exports.deleteWaste = (req, res) => {
    Waste.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Waste deleted successfully');
    });
};

exports.updateShippingStatus = (req, res) => {
    const { shipping_status } = req.body;
    Waste.updateShippingStatus(req.params.id, shipping_status, (err, results) => {
        if (err) return res.status(500).send(err);

        if (shipping_status === 'Completed') {
            Waste.getWasteById(req.params.id, (err, wasteResults) => {
                if (err) return res.status(500).send(err);

                const waste = wasteResults[0];
                User.updatePoints(waste.user_id, waste.points_awarded, (err, updateResult) => {
                    if (err) return res.status(500).send('Error updating user points');
                    res.status(200).send('Shipping status updated successfully and user points updated');
                });
            });
        } else {
            res.status(200).send('Shipping status updated successfully');
        }
    });
};
