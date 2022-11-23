const router = require('express').Router();
const { Product } = require('../models/product');

router.post('/addproduct', (req, res) => {
    try {
        // const { product } = req.body;
        const productModel = new Product({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
        });

        productModel.save();

        res.status(201).send({
            message: "Product Add Successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

module.exports = router;