const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = new express.Router();
const { validateSignup, validateLogin } = require('../auth/validation');
const User = require('../models/user');

const saltRounds = 10;

const httpResp = {
    userDNE: "User does not exist",
    loginSucess: "Login Succeeded",
    loginFail: "Incorrect Password"
};

var genHash = async function(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_pw = await bcrypt.hash(password, salt);
    return hashed_pw;
}

router.post('/login', async (req, res) => {
    const error = validateLogin(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const userDB = await User.findOne({ email: req.body.email });
    if (!userDB) return res.status(400).send(httpResp.userDNE);
    const match = await bcrypt.compare(req.body.password, userDB.password);
    if (!match) return res.status(400).send(httpResp.loginFail);
    const token = jwt.sign({ _id: userDB.id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    res.send(JSON.stringify({
        token: token,
        msg: httpResp.loginSucess
    }));
});

router.post('/signup', async (req, res) => {
    const error = validateSignup(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await genHash(req.body.password)
    });
    try {
        const savedUser = await user.save();
        const token = jwt.sign({ _id: savedUser.id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token);
        res.send(JSON.stringify({
            token: token,
            user: savedUser
        }));
    } catch (err) {
        res.status(400).send(err.errmsg);
    }
});

module.exports = router;