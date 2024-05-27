const User = require('../models/userModel');

module.exports = (req, res, next) => {
    const userId = req.headers['user-id'];

    if (!userId) return res.sendStatus(401);

    User.findById(userId, (err, results) => {
        if (err || results.length === 0) return res.sendStatus(403);
        req.userId = userId;
        next();
    });
};
