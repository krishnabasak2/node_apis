require('dotenv').config();
const User = require('../models/UserModel');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { body, validator } = require('express-validator');

const allUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
}

const create = async (req, res) => {
    const { name, email, password } = req.body;
    const email_varify = await User.findOne({ email });
    if (email_varify) {
        return res.status(400).send({ "error": "email exist" });
    }
    const salt = await bcript.genSalt(10);
    const hashPassword = await bcript.hash(password, salt);
    const user = await User.create({ name, email, password: hashPassword });

    const user_data = {
        user_id: user.id
    }
    const authToken = jwt.sign(user_data, process.env.JWT_SECRET);
    res.status(201).send({"status": true, authToken });
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ "status": false, "message": "Credentials not match1" });
        };

        const comparePassword = await bcript.compare(password, user.password.toString());

        if (comparePassword) {
            const user_data = {
                user_id: user.id
            }
            const authToken = jwt.sign(user_data, process.env.JWT_SECRET);
            res.status(200).send({ "status": true, authToken });
        } else {
            return res.status(400).send({ "status": false, "message": "Credentials not match2", "data": password});
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Credentials not match3", "data": error });
    }
}

const authUser = async (req, res) => {
    const user_data = await User.findById(req.user.user_id).select('-password');
    res.status(200).send(user_data);
}

module.exports = { allUsers, create, login, authUser };