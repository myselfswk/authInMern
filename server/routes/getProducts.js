const router = require('express').Router();
const { Product } = require('../models/product');
const jwt = require('jsonwebtoken');

// Token Function
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]


    if (token == null) return res.status(401).send("No Token");

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        if (err) return res.json({ message: "Invalid Token" });
        req.user = user;
        return next();
    })
}

//get All Product
router.get('/getallproducts/', authenticateToken, (req, res) => {
    //empty object '{}' indicates that there is no condition in find method
    Product.find({}, (err, docs) => {
        //find(error, result(we write it as documents))
        // const authHeader = req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1];
        // console.log(token);

        // var decoded = jwt.decode(token, { complete: true });
        // console.log("Decoded Header: ", decoded.header);
        // console.log("Decoded Payload", decoded.payload)

        // const valToken = jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        //     if (err) return res.status(403).send({ message: "Forbidden" })
        //     req.user = user;
        // })

        // console.log(valToken);

        // const valToken = jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
        //     return req.user = user;
        // })
        // { _id: '637d24bd818327c91a484abd', iat: 1669220005, exp: 1669824805 }
        // console.log(valToken);

        try {
            return res.status(200).send({
                product_list: docs
            });
            // if (token) {
            //     return res.status(200).send({
            //         product_list: docs
            //     });
            // } else {
            //     res.send({ message: "No Token" });
            // }

        } catch (error) {
            return res.status(400).json({
                message: 'No Token'
            })
        }
    })
})

module.exports = router;