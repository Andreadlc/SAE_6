exports.getCalcul = (req, res) => {
    // Sécurité pour le rôle
    const role = (req.session.user && req.session.user.role) ? req.session.user.role : 'guest';

    res.render('calcul', { 
        isLog: req.session.isLog,
        userRole: role // On ajoute userRole ici aussi pour la navigation !
    });
}

exports.postCalcul = (req, res) => {
    // 1. On récupère les valeurs du formulaire
    const programme = req.body.programme;
    const valeur = req.body.valeur;
    const nb_process = req.body.nb_process;

    // 2. Simulation de calcul (2 secondes)
    setTimeout(() => {
        const messageResultat = `Le programme ${programme} a été exécuté avec la valeur ${valeur} sur ${nb_process} processus.`;
        
        // Sécurité pour le rôle (indispensable pour éviter le crash)
        const role = (req.session.user && req.session.user.role) ? req.session.user.role : 'guest';

        res.render('calcul', { 
            resultat: messageResultat,
            isLog: req.session.isLog,
            userRole: role, 
            error: null 
        });
    }, 2000);
};

exports.getHistorique = (req, res) => {
    // On ne garde que la sécurité pour le rôle et l'état de connexion
    const role = (req.session.user && req.session.user.role) ? req.session.user.role : '0';

    res.render('historique', {
        userRole: role,
        isLog: req.session.isLog
    });
};