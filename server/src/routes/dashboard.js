const express = require('express');
const router = new express.Router();

const utils = require('../utils/utils');

// Token
const verifyToken = require('../auth/verify_token');
const jwt = require('jsonwebtoken');

// DB models
const User = require('../models/user');
const Chat = require('../models/chat_model');

router.get('/dashboard', verifyToken, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    const chat_data = {
        name: user.name,
        date: Date.now(),
        chats: user.chats,
    };
    res.send(chat_data);
});

router.get('/dashboard/:id', verifyToken, async (req, res) => {
    const chat = await Chat.findById(req.params.id);
    users = [];
    for (const member of chat.members) {
        const user = await User.findById(member);
        users.push(user.email);
    }
    res.send(users);
});

router.post('/create-chat', async (req, res) => {
    member_ids = await utils.findUsers(req.body.members);
    console.log(member_ids);
    const chat = new Chat({
        members: member_ids,
    });
    try {
        const savedChat = await chat.save();
        await User.updateMany(
            { _id: { $in: member_ids } },
            { $push: { chats: savedChat._id } }
        );
        res.send(savedChat._id);
    } catch (err) {
        res.status(400).send(err.errmsg);
    }
});

module.exports = router;
