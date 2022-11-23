const router = require('express').Router();
const { Product } = require('../models/product');

//Delete Product
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        await Product.findByIdAndDelete(req.params.id);
        res.json(`Item is Deleted...`);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router;