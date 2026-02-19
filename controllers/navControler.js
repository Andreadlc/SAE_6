exports.getAccueil = (req, res) => {
    const userRole = req.session.user ? req.session.user.role : 'guest';

    res.render('accueil', { isLog: req.session.isLog, userRole: userRole });
        
    }
