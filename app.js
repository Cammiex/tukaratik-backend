require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const wasteRoutes = require('./routes/wasteRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.set('trust proxy', 1);
const allowedOrigins = [
  'http://localhost:3000',
  'https://tukar-ratik.vercel.app',
];
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.static('public'));
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use('/users', userRoutes);
app.use('/waste', wasteRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
