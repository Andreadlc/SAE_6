
exports.getAccueil = (req, res) => {
        res.render('accueil', { isLog: req.session.isLog });
    }
