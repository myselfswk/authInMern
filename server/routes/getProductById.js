const router = require('express').Router();
const { Product } = require('../models/product');

router.get('/getProduct/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Product.findById(req.params.id);
        res.json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;