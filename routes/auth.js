const express = require('express');
const router = express.Router();
const navController = require('../controllers/authController');
router.get('/auth', navController.getAuth);
router.post('/auth', navController.postAuth);

module.exports = router;

