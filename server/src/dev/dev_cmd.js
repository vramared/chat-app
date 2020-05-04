const express = require('express');
const router = new express.Router();

const User = require('../models/user');
const Chat = require('../models/chat_model');

router.post('/clear-chats', async (req, res) => {
    try {
        await User.updateMany({}, { $set: { chats: [] } });
        await Chat.deleteMany({});
        res.send('Cleared');
    } catch (err) {
        res.status(400).send(err.errmsg);
    }
});

module.exports = router;
