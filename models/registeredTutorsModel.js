const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const paswordComplexity = require('joi-password-complexity');

const registeredTutorSchema = new mongoose.Schema({
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
    isTutor: {
        type: Boolean,
        default: true
    },
    transitN: {
        type: String,
        required: false
    },
    accN: {
        type: String,
        required: false
    },
    branchN: {
        type: String,
        required: false
    }
});

console.log( process.env.JWT_PRIVATE_KEY)

registeredTutorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY,
        {expiresIn: '1h'})
        return token;
}

const Tutor = mongoose.model('tutor', registeredTutorSchema);

const validateTutor = (Tutor) => {
    const schema = Joi.object({
        firstname: Joi.string().required().label('First Name'),
        lastname: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        phone: Joi.number().required().label('Phone'),
        password: paswordComplexity().required().label('Password')
    });
    return schema.validate(Tutor);
}

module.exports = {Tutor, validateTutor};