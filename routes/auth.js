const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.get('/auth', authController.getAuth);
router.post('/auth', authController.postAuth);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.getLogout);


module.exports = router;

