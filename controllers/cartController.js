const Cart = require('../models/cartModel');

exports.getAllCartItems = (req, res) => {
    const userId = req.userId; // Assuming userId is set in the middleware
    Cart.getAll(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

exports.addCartItem = (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    Cart.add(userId, productId, quantity, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Item added to cart', cartId: results.insertId });
    });
};

exports.updateCartItem = (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    Cart.update(id, quantity, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Cart item updated' });
    });
};

exports.deleteCartItem = (req, res) => {
    const { id } = req.params;
    Cart.delete(id, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Cart item deleted' });
    });
};
