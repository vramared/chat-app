const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please enter your password!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: false
        }
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;