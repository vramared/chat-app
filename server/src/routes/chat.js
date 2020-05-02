const express = require('express');
const router = new express.Router();
const verifyToken = require('../auth/verify_token');
const User = require('../models/user');
const Chat = require('../models/chat_model');
const jwt = require('jsonwebtoken');

const socketConnection = function (io) {
    io.on('connection', (socket) => {
        console.log('a user connected');
        handleChat(socket, io);
        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });
    });
};

const handleChat = function (socket, io) {
    socket.on('chat', (msg) => {
        console.log(msg);
        socket.broadcast.emit('chat', msg);
    });
};

const findUsers = async function (members) {
    member_ids = [];
    for (const member of members) {
        userDb = await User.findOne({ email: member });
        member_ids.push(userDb._id);
    }
    return member_ids;
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

router.post('/create-chat', async (req, res) => {
    member_ids = await findUsers(req.body.members);
    const chat = new Chat({
        members: member_ids,
    });
    try {
        const savedChat = await chat.save();
        User.updateMany(
            { _id: { $in: member_ids } },
            { $push: { chats: savedChat._id } }
        );
        res.send(savedChat._id);
    } catch (err) {
        res.status(400).send(err.errmsg);
    }
});

module.exports.router = router;
module.exports.socketConnection = socketConnection;
