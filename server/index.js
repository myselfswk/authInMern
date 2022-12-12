require('dotenv').config();

const express = require('express');
const app = express();

//cors is middleware
const cors = require('cors');

//import database
const connection = require('./db');

// import User Routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const allUserRoutes = require('./routes/allUser');
const userByIdRoutes = require('./routes/userById');
const updateUserRoute = require('./routes/updateUser');
const deleteUserRoute = require('./routes/deleteUser');

//import Product Routes
const addProduct = require('./routes/addProduct');
const getProduct = require('./routes/getProducts');
const getProductById = require('./routes/getProductById');
const deleteProductById = require('./routes/deleteProduct');
const updateProductById = require('./routes/updateProduct');

//database Connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/allusers', allUserRoutes);
app.use('/api/', userByIdRoutes);
app.use('/api/', updateUserRoute);
app.use('/api/', deleteUserRoute);

//Product Routes
app.use('/api/', addProduct);
app.use('/api/', getProduct);
app.use('/api/', getProductById);
app.use('/api/', deleteProductById);
app.use('/api/', updateProductById);

app.get('/', (req, res) => res.send('An API...'));

//Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App is Running at ${port}....`));