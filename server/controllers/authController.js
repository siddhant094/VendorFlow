// const URL = require('../models/url');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const User = require('../models/user');
const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../helpers/auth');

require('dotenv').config();

const userProfile = async (req, res) => {
    try {
        // res.send('Working');
        const { id } = req.body;
        console.log('id ' + id);
        const user = await User.findById(id);
        if (!user) {
            return res.json({
                error: 'No user found',
            });
        }
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found',
            });
        }
        const match = await comparePassword(password, user.password);
        if (match) {
            // res.json('passwords match');
            let token;
            try {
                token = jwt.sign(
                    { id: user._id, email: user.email },
                    'process.env.JWT_KEY',
                    { expiresIn: '1h' }
                );
            } catch (err) {
                // const error = new HttpError(
                //     'Logging in failed, please try again later.',
                //     500
                // );
                console.log(err);
                return res.status(400).json({ error: 'Incorrect Credentials' });
            }

            res.json({
                userId: user._id,
                email: user.email,
                name: user.name,
                token: token,
            });

            // jwt.sign(
            //     { email: user.email, id: user._id, name: user.name },
            //     process.env.JWT_SECRET,
            //     {},
            //     (err, token) => {
            //         if (err) throw err;
            //         res.cookie('token', token).json(user);
            //     }
            // );
        } else res.json({ error: 'Incorrect Credentials' });
    } catch (error) {
        console.log(error);
    }
};

// const registerUser = async (req, res) => {
//     res.send('Register Route is working.');
// };

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // console.log('1')
        if (!name || !email || !password) {
            return res.json({
                error: 'name is required',
            });
        }
        // console.log('2')
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({
                error: 'Email is already registered, please Login',
            });
        }
        // console.log('3')
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            vendors: [],
            history: [],
        });
        // console.log('4')
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
    // res.send('HELLO');
};

module.exports = {
    registerUser,
    loginUser,
    userProfile,
};
