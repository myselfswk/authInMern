const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
});

//return json web token for specific user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    }, process.env.JWTPRIVATEKEY, {
        expiresIn: '7d'
    });
    return token;
}

const User = mongoose.model("user", userSchema);

//Validate User
const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label('Email'),
        password: passComplexity().required().label("Password")
    })
    return schema.validate(data);
}

module.exports = {
    User,
    validate
}