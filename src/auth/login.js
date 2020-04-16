const bcrypt = require('bcryptjs');
const express = require('express');
const Joi = require('@hapi/joi');
const router = new express.Router();
const User = require('../model/user');

const saltRounds = 10;

var auth = function(username, password) {
    const salt = bcrypt.genSalt(10);
}

var genHash = async function(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashed_pw = await bcrypt.hash(password, salt);
    return hashed_pw;
}

router.post('/login', async (req, res) => {
    //await auth(username, password);
    res.send("Login Succeeded");
});

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

router.post('/signup', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await genHash(req.body.password)
    });
    try {
        await schema.validateAsync(req.body);
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        console.log(err);
        res.status(400).send("Failed to add user to DB");
    }
});

module.exports = router;