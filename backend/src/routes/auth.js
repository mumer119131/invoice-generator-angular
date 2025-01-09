const express = require('express');
const {handleGoogleLogin, handleGoogleLogout} = require('../controller/authController');
const {authenticate} = require('../middleware/authorize');
const router = express.Router();


router.post('/google', handleGoogleLogin);
router.get('/check', authenticate, (req, res) => {
    res.status(200).json({message: 'Authorized', user: req.user});
});
router.get('/logout', handleGoogleLogout);


module.exports = router;