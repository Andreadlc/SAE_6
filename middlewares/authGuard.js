// middlewares/authGuard.js
module.exports = (req, res, next) => {
    // Si la variable isLog n'est pas vraie
    if (!req.session.isLog) {
        console.log("Accès refusé : utilisateur non connecté");
        req.session.error = "Vous devez être connecté pour accéder à cette page.";
        return res.redirect('/auth'); // On le renvoie au login
    }
    
    // Si c'est bon, on appelle next() pour passer au controller suivant
    next();
};