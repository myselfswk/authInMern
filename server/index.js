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
const allUserRoutes = require('./routes/allUser');
const userByIdRoutes = require('./routes/userById');
const updateUserRoute = require('./routes/updateUser');

//database Connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/allusers', allUserRoutes);
app.use('/api/', userByIdRoutes);
app.use('/api/', updateUserRoute);

app.get('/', (req, res) => res.send('An API...'));

//Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Port is Running at ${port}....`));