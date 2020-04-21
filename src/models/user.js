const mongoose = require('mongoose')

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
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
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