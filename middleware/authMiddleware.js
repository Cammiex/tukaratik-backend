const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken.userId) return res.sendStatus(403); // Menangani kasus token tidak valid
        req.user = decodedToken.userId;
        next();
    });
};
