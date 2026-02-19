const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middlewares/adminGuard');
router.get('/admin', isAdmin, adminController.getAdmin);

module.exports = router;