// const URL = require('../models/url');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const User = require('../models/user');
const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../helpers/auth');


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
            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                }
            );
        } else res.json({ error: 'Incorrect Credentials' });
    } catch (error) {
        console.log(error);
        // toa;
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
};
