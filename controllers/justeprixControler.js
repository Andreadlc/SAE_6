exports.getJustePrix = (req, res) => {
    // On vérifie si l'utilisateur existe avant de demander son rôle
    const role = (req.session.user && req.session.user.role) ? req.session.user.role : 'guest';

    res.render('justeprix', { 
        isLog: req.session.isLog, 
        userRole: role 
    });
}