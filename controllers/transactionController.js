const Transaction = require('../models/transactionModel');

exports.createTransaction = (req, res) => {
    const { userId, productId, quantity, pointsSpent } = req.body;
    Transaction.create(userId, productId, quantity, pointsSpent, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Transaction created successfully');
    });
};

exports.getTransactionsByUser = (req, res) => {
    const userId = req.params.userId;
    Transaction.getByUserId(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};
