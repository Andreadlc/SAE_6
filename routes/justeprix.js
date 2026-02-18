const express = require('express');
const router = express.Router();
const navController = require('../controllers/justeprixControler');
const isAuthenticated = require('../middlewares/authGuard');
router.get('/justeprix', isAuthenticated, navController.getJustePrix);

module.exports = router;