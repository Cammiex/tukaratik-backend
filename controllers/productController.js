const Product = require('../models/productModel');
const User = require('../models/userModel');
const Transaction = require('../models/transactionModel');

exports.redeemPoints = (req, res) => {
    const { userId, productId, quantity } = req.body;

    Product.findById(productId, (err, productResults) => {
        if (err) return res.status(500).send(err);
        if (productResults.length === 0) return res.status(404).send('Product not found');

        const product = productResults[0];
        const totalPointsRequired = product.points_required * quantity;

        User.findByUsername(userId, (err, userResults) => {
            if (err) return res.status(500).send(err);
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