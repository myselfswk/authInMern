require('dotenv').config();

const express = require('express');
const app = express();

//cors is middleware
const cors = require('cors');

//import database
const connection = require('./db');

// import Routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

//database Connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

//Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Port is Running at ${port}....`));