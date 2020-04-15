const bcrypt = require('bcryptjs');
const express = require('express');
const router = new express.Router();
const user = require('../model/user');

var auth = function(username, password) {
    const salt = bcrypt.genSalt(10);
}

router.get('/login', async (req, res) => {
    res.send("Succeeded");
});

router.post('/login', async (req, res) => {
    //await auth(username, password);
    res.send("Login Succeeded");
});

router.post('/signup', async (req, res) => {
    res.send("Login Succeeded");
});

module.exports = router;