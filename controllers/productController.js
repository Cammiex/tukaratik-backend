const Product = require('../models/productModel');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

exports.getAllProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

exports.addProduct = (req, res) => {
    const { name, description, points_required, stock, weight, image_url } = req.body;

    if (!name || !points_required || !stock) {
        return res.status(400).send('Name, points required, and stock are required');
    }

    Product.create(name, description, points_required, stock, weight, image_url, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Product added successfully');
    });
};

exports.updateProduct = (req, res) => {
    const { name, description, points_required, stock, weight, image_url } = req.body;

    Product.update(req.params.id, name, description, points_required, stock, weight, image_url, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Product updated successfully');
    });
};

exports.deleteProduct = (req, res) => {
    Product.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Product deleted successfully');
    });
};

exports.redeemPoints = (req, res) => {
    const { userId, productId, quantity } = req.body;

    Product.findById(productId, (err, productResults) => {
        if (err) return res.status(500).send(err);
        if (productResults.length === 0) return res.status(404).send('Product not found');

        const product = productResults[0];
        const totalPointsRequired = product.points_required * quantity;

        User.findById(userId, (err, userResults) => {
            if (err) return res.status(500).send(err);
            if (userResults.length === 0) return res.status(404).send('User not found');
            
            const user = userResults[0];

            if (user.total_points < totalPointsRequired) {
                return res.status(400).send('Insufficient points');
            }

            Product.updateStock(productId, quantity, (err, updateResults) => {
                if (err) return res.status(500).send(err);

                User.updatePoints(userId, -totalPointsRequired, (err, updateResults) => {
                    if (err) return res.status(500).send(err);

                    Transaction.create(userId, productId, quantity, totalPointsRequired, (err, transactionResults) => {
                        if (err) return res.status(500).send(err);
                        res.send('Points redeemed and product transaction recorded successfully');
                    });
                });
            });
        });
    });
};
