const express = require('express');
const user = require('../model/user');
const router = new express.Router();

router.get('/login', async (req, res) => {
    res.send("Succeeded");
});

router.post('/login', async (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    res.send("Succeeded");
});

module.exports = router;