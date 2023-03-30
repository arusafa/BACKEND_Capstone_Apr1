const mongoose = require('mongoose');
const Joi = require('joi');

const ProfileModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
});

const profile = mongoose.model('profile', ProfileModelSchema);

const validateProfileModel = (profileInfo) => {
    const schema = Joi.object({
        name: Joi.string().required().label("name"),
        bio: Joi.string().required().label("bio"),
        image: Joi.string().required().label("image")
    });
    
    return schema.validate(profileInfo);
}

module.exports = {profile, validateProfileModel};