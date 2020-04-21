const express = require('express');
const router = new express.Router();
const verifyToken = require('../auth/verify_token');

router.get('/chat', verifyToken, (req, res) => {
    const info = {
        date: Date.now(),
        msg: "This is your chat home"
    }
    res.send(info);
});

module.exports = router;
