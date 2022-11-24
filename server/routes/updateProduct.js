const router = require('express').Router();
const { Product } = require('../models/product');

router.patch('/updateproduct/:id', async (req, res) => {
    try {
        const updatedData = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price
        }
        const options = { new: true };

        const result = await Product.findByIdAndUpdate(req.params.id, updatedData, options);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router;