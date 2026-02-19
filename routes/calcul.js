const express = require('express');
const router = express.Router();
const calculController = require('../controllers/calculController');
const isAuthenticated = require('../middlewares/authGuard');

router.get('/calcul', isAuthenticated, calculController.getCalcul);
router.post('/calcul', isAuthenticated, calculController.postCalcul);

module.exports = router;
