const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.addItemToCart = (req, res) => {
    const { userId, productId, quantity } = req.body;

    Product.getById(productId, (err, product) => {
        if (err) return res.status(500).send(err);
        if (!product || product.stock < quantity) return res.status(400).send('Stock not sufficient');

        Cart.addItem(userId, productId, quantity, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).send('Item added to cart');
        });
    });
};

exports.updateCartItem = (req, res) => {
    const { userId, productId, quantity } = req.body;

    Product.getById(productId, (err, product) => {
        if (err) return res.status(500).send(err);
        if (!product || product.stock < quantity) return res.status(400).send('Stock not sufficient');

        Cart.updateQuantity(userId, productId, quantity, (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).send('Cart item updated');
        });
    });
};

exports.getCartItems = (req, res) => {
    const { userId } = req.params;

    Cart.getItems(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
};

exports.deleteCartItem = (req, res) => {
    const { userId, productId } = req.body;

    Cart.deleteItem(userId, productId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Cart item deleted');
    });
};

exports.clearCart = (req, res) => {
    const { userId } = req.params;

    Cart.clearCart(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Cart cleared');
    });
};
