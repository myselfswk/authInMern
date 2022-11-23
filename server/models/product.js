const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
})

//'products' is same as you create it in mongodb
const Product = mongoose.model('products', productSchema);
module.exports = {
    Product
};