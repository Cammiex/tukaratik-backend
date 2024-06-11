const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const moment = require('moment');
require('moment/locale/id'); // Mengimpor ekstensi bahasa Indonesia untuk moment

exports.createOrder = (req, res) => {
    const { userId, address, phone } = req.body;

    Cart.getItems(userId, (err, cartItems) => {
        if (err) return res.status(500).send(err);
        if (cartItems.length === 0) return res.status(400).send('Cart is empty');

        const totalPoints = cartItems.reduce((sum, item) => sum + item.total_points, 0);

        User.getTotalPoints(userId, (err, userResult) => {
            if (err) return res.status(500).send(err);
            const userPoints = userResult[0].total_points;

            if (userPoints < totalPoints) {
                return res.status(400).send('Not enough points to complete the order');
            }

            // Format tanggal dalam Bahasa Indonesia
            const createdAt = moment().locale('id').format('YYYY-MM-DD HH:mm:ss');

            Order.create(userId, address, phone, totalPoints, createdAt, createdAt, (err, results) => {
                if (err) return res.status(500).send(err);

                const orderId = results.insertId;

                const addOrderItems = cartItems.map(item => {
                    return new Promise((resolve, reject) => {
                        Order.addOrderItem(orderId, item.product_id, item.quantity, (err, result) => {
                            if (err) reject(err);
                            resolve(result);
                        });
                    });
                });

                Promise.all(addOrderItems).then(() => {
                    const reduceStockPromises = cartItems.map(item => {
                        return new Promise((resolve, reject) => {
                            Product.reduceStock(item.product_id, item.quantity, (err, result) => {
                                if (err) reject(err);
                                resolve(result);
                            });
                        });
                    });

                    Promise.all(reduceStockPromises).then(() => {
                        User.updatePoints(userId, -totalPoints, (err, updateResult) => {
                            if (err) return res.status(500).send('Error updating user points');
                            Cart.clearCart(userId, (err, clearResult) => {
                                if (err) return res.status(500).send(err);
                                res.status(200).send('Order created, stock updated, and cart cleared');
                            });
                        });
                    }).catch(err => res.status(500).send(err));
                }).catch(err => res.status(500).send(err));
            });
        });
    });
};

exports.updateOrderStatus = (req, res) => {
    const { orderId, status } = req.body;

    const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

    Order.updateStatus(orderId, status, updatedAt, (err, results) => {
        if (err) {
            console.error('Error updating order status:', err);
            return res.status(500).send(err);
        }

        if (status === 'Completed' || status === 'Failed') {
            Order.getOrderById(orderId, (err, orderResults) => {
                if (err) {
                    console.error('Error getting order by ID:', err);
                    return res.status(500).send(err);
                }

                // Log the results to see what is returned
                console.log('Order results:', orderResults);

                if (orderResults.length === 0) {
                    return res.status(404).send('Order not found');
                }

                const order = orderResults[0];  // Assuming the query returns an array of results
                const userId = order.user_id;
                const points = order.total_points;

                if (status === 'Failed') {
                    User.updatePoints(userId, points, (err, updateResult) => {
                        if (err) {
                            console.error('Error updating user points:', err);
                            return res.status(500).send('Error updating user points');
                        }
                        console.log(`Points refunded for user ${userId}: ${points}`);
                        res.status(200).send('Order status updated and points refunded');
                    });
                } else {
                    res.status(200).send('Order status updated');
                }
            });
        } else {
            res.status(200).send('Order status updated');
        }
    });
};
exports.getOrderHistory = (req, res) => {
    const userId = req.params.userId;

    Order.getOrderHistoryByUser(userId, (err, orderHistory) => {
        if (err) return res.status(500).send(err);

        const formattedHistory = orderHistory.map(order => ({
            description: moment(order.created_at).format('dddd, Do MMMM YYYY') + ' - ' + order.address,
            products: order.products.split(', '),
            totalPoints: -order.total_points_order, 
            status: order.status
        }));

        res.status(200).json(formattedHistory);
    });
};
