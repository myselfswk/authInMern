const router = require('express').Router();
const { User, validate } = require('../models/user');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    try {
        //Check Validation
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }

        // if there is no error we check that the user is exist or not
        // send email after registeration
        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(409).send({
                message: "User Already Exist"
            });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //generate token for specific user
        // const token = jwt.sign({
        //     _id: this._id
        // }, process.env.JWTPRIVATEKEY, {
        //     expiresIn: '7d'
        // });

        user = await new User({
            ...req.body,
            password: hashPassword
        }).save();
        console.log(user);

        // err => {
        //     if (!err) {
        //         res.status(201).send({
        //             status: res.statusCode,
        //             name: req.body.firstName + " " + req.body.lastName,
        //             email: req.body.email,
        //             token: token,
        //             message: "An Email Send to Your Account, Please Verify"
        //         });
        //     } else {
        //         res.send('Something Went Wrong');
        //     }
        // }

        //generate token
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        // console.log(token);

        // Base Url
        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        //Now send email to verify
        await sendEmail(user.email, "Email Verify", url);

        res.status(201).send({
            message: "An Email Send to Your Account, Please Verify"
        })

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error, User Sign Up"
        });
    }
});

// Email Verify route
router.get('/:id/verify/:token/', async (req, res) => {
    try {
        //Check if link is valid
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) return res.status(400).send({ message: "Invalid Link" });

        //check if the token is valid or not
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) return res.status(400).send({ message: "Invalid Link, Token" });
        // console.log("User: ".concat(user, " Token", token));

        await User.updateOne({ _id: user._id }, { verified: true });
        // await token.remove();

        res.status(200).send({
            message: "Email Verified Successfully"
        })

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error, By Token"
        });
    }
})

module.exports = router;