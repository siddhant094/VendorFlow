const express = require('express');
const {
    registerUser,
    loginUser,
    userProfile,
} = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', userProfile);

module.exports = router;
