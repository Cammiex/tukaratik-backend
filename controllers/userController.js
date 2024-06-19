const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  User.create(username, hashedPassword, email, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send('User registered successfully');
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordValid) return res.status(401).send('Invalid password');

    res
      .status(200)
      .json({
        message: 'Login successful',
        user: { email: user.email, id: user.user_id },
      });
  });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('User deleted successfully');
  });
};

exports.getUserPointsById = (req, res) => {
  User.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('User not found');
    res.status(200).json({ total_points: results[0].total_points });
  });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('User not found');
    res.status(200).json(results[0]);
  });
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};
