const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const paswordComplexity = require('joi-password-complexity');

const registeredUsersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isStudent: {
        type: Boolean,
        default: true
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    province: {
        type: String,
        required: false,
    },
    postalCode: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    cardHolderName: {
        type: String,
        required: false,
    },
    cardNumber: {
        type: String,
        required: false,
    },
    cardExpMonth: {
        type: String,
        required: false,
    },
    cardExpYear: {
        type: String,
        required: false,
    },
    cardExpCVV: {
        type: String,
        required: false,
    },
});

registeredUsersSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY,
        {expiresIn: '1h'})
        return token;
}

const User = mongoose.model('registeredUsers', registeredUsersSchema);

const validateUser = (User) => {
    const schema = Joi.object({
        firstname: Joi.string().required().label('First Name'),
        lastname: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        phone: Joi.number().required().label('Phone'),
        password: paswordComplexity().required().label('Password')
    });
    return schema.validate(User);
}

module.exports = {User, validateUser};