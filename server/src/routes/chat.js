const express = require('express');
const router = new express.Router();
const verifyToken = require('../auth/verify_token');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleChat = function (socket, io) {
    socket.on('chat', (msg) => {
        console.log(msg);
        socket.broadcast.emit('chat', msg);
    });
};

router.get('/chat', verifyToken, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: decoded._id });
    const info = {
        name: user.name,
        date: Date.now(),
    };
    res.send(info);
});

module.exports.router = router;
module.exports.handleChat = handleChat;
