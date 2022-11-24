const router = require('express').Router();
const { User, validate } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        //Check Validation
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }

        //if there is no error we check that the user is exist or not
        const user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(409).send({
                message: "User Already Exist"
            });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const token = jwt.sign({
            _id: this._id
        }, process.env.JWTPRIVATEKEY, {
            expiresIn: '7d'
        });

        await new User({
            ...req.body,
            password: hashPassword
        }).save(err => {
            if (!err) {
                res.status(201).send({
                    status: res.statusCode,
                    name: req.body.firstName + " " + req.body.lastName,
                    email: req.body.email,
                    token: token,
                    message: "User Create Successfully"
                });
            } else {
                res.send('Something Went Wrong');
            }
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
})

module.exports = router;