const bcrypt = require('bcryptjs');
const express = require('express');
const router = new express.Router();
const { validateSignup, validateLogin } = require('./validation');
const User = require('../model/user');

const saltRounds = 10;

var genHash = async function(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_pw = await bcrypt.hash(password, salt);
    return hashed_pw;
}

router.post('/login', async (req, res) => {
    const error = validateLogin(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    const userDB = await User.findOne({ email: req.body.email });
    const match = await bcrypt.compare(req.body.password, userDB.password);
    if(match) return res.send("Login Succeeded");
    res.status(400).send("Login Unsuccessful");
});

router.post('/signup', async (req, res) => {
    const error = validateSignup(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await genHash(req.body.password)
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err.errmsg);
    }
});

module.exports = router;