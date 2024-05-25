require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const wasteRoutes = require('./routes/wasteRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use('/users', userRoutes);
app.use('/waste', wasteRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/transactions', transactionRoutes);
app.use('/', profileRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
