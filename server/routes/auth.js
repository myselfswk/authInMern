const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Token = require('../models/token');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

router.post('/', async (req, res) => {
    //when we passed funtion in a parameter, its callback funtion
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }

        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(401).send({
                message: "Invalid Email or Password"
            });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(401).send({
                message: "Invalid Password"
            });
        }

        // check if the user is verified or not
        if (!user.verified) {
            // get token
            let token = await User.findOne({
                userId: user._id
            });
            if (!token) {
                //generate token
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save();

                // Base Url
                const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
                //Now send email to verify
                await sendEmail(user.email, "Email Verify", url);
            }

            res.status(400).send({
                message: "An Email Send to Your Account, Please Verify"
            })
        }

        //token for login user
        const token = user.generateAuthToken();

        res.status(200).send({
            data: token,
            message: "logged in successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
});

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = router;