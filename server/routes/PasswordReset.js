const router = require('express').Router();
const { User } = require('../models/user');
const Token = require('../models/token');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');

// Send Password Link
router.post('/', async (req, res) => {
    try {
        // Verify if email is valid
        const emailSchema = joi.object({
            email: joi.string().email().required().label("Email")
        });
        const { error } = emailSchema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            })
        }

        // lets find user with email
        let user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(409).send({
                message: "User with given Email doesn't exist"
            })
        }

        // token with email
        let token = await Token.findOne({
            userId: user._id
        });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`;
        // Now Send email
        await sendEmail(user.email, "Password Reset", url);

        res.status(200).send({
            message: "Password Reset Link sent to your email account"
        })

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error, Sent Forget Password Link"
        });
    }
});

// Verify url is valid or not
router.get('/:id/:token', async (req, res) => {
    try {
        // check if url is correct for user
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(400).send({
                message: "Invalid Link"
            });
        }

        // check if token is valid for user
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) {
            return res.status(400).send({
                message: "Invalid Link, token"
            });
        }

        res.status(200).send({
            message: "Valid Url"
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error, Sent Verify Url Link"
        });
    }
});

// Reset Password Route
router.post('/:id/:token', async (req, res) => {
    try {
        // check if new password is valid
        const passwordSchema = joi.object({
            password: passwordComplexity().required().label("Password")
        });
        const { error } = passwordSchema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }

        // check if url is correct for user
        const user = await User.findOne({
            _id: req.params.id
        });
        if (!user) {
            return res.status(400).send({
                message: "Invalid Link"
            });
        }

        // check if token is valid for user
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) {
            return res.status(400).send({
                message: "Invalid Link, token"
            });
        }

        if (!user.verified) {
            user.verified = true;
        }

        // hash Password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Now Save new password on user
        user.password = hashPassword;
        await user.save();

        await token.remove();

        res.status(200).send({
            message: "Password Reset Successfully"
        });

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error, Reset Password Link"
        });
    }
});

module.exports = router;