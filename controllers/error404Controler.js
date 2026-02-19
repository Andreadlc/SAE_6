exports.get404 = (req, res, next) => {
    // On vérifie que la session ET l'user existent
    const userRole = (req.session && req.session.user) ? req.session.user.role : 'guest';
    const isLog = req.session ? req.session.isLog : false;

    res.status(404).render('404', { 
        pageTitle: 'Not Found', 
        isLog: isLog, 
        userRole: userRole 
    });
};