const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: {
        required: false,
    },
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
