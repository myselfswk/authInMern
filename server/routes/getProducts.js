const router = require('express').Router();
const { Product } = require('../models/product');

// Import middlewares
const { paginatedResults } = require('../middlewares/paginatedResults');
const { authenticateToken } = require('../middlewares/authenticateToken');

//get All Product
router.get('/getallproducts/', authenticateToken, paginatedResults(Product), (req, res) => {
    res.json(res.paginatedResults)
})

module.exports = router;