const mongoose = require('mongoose');




const userSchema = mongoose.Schema({
    "iss": {
        type: String,
        required: true
    },
    "azp": {
        type: String,
        required: true
    },
    "aud": {
        type: String,
        required: true
    },
    "sub": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "email_verified": {
        type: Boolean,
        required: true
    },
    "nbf": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "picture": {
        type: String,
        required: true
    },
    "given_name": {
        type: String,
        required: true
    },
    "family_name": {
        type: String,
        required: true
    },
    "iat": {
        type: Number,
        required: true
    },
    "exp": {
        type: Number,
        required: true
    },
    "jti": {
        type: String,
        required: true
    }
}, {timestamps: true});


const User = mongoose.model('User', userSchema);

module.exports = User;