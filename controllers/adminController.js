exports.getAdmin = (req, res) => {
    // On vérifie si req.session.user existe avant d'accéder à .role
    // S'il n'existe pas, on met 'guest' par défaut
    const role = (req.session.user && req.session.user.role) ? req.session.user.role : 'guest';

    res.render('admin', { 
        isLog: req.session.isLog, 
        userRole: role // On utilise bien userRole comme dans ta navigation
    });
};