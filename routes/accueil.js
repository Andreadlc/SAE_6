const express = require('express');
const router = express.Router();
const navController = require('../controllers/navControler');

router.get('/', navController.getAccueil);

module.exports = router;