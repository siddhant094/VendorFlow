// const URL = require('../models/url');
const User = require('../models/user');
// const User = require('../models/user');
const mongoose = require('mongoose');

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

        if (!name || !email || !password) {
            return res.json({
                error: 'name is required',
            });
        }
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({
                error: 'Email is already registered, please Login',
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            vendors: [],
            history: [],
        });
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
