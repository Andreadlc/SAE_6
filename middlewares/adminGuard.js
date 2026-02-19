module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.role === 1) {
        next();
    } else {
        console.log('Accès refusé : utilisateur non administrateur');
        req.session.error = "Vous devez être administrateur pour accéder à cette page.";
        return res.redirect('/auth'); // On le renvoie au login
    }
};