const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('accueil', { isLog: req.session.isLog });
});

module.exports = router;