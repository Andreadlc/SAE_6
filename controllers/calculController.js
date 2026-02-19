exports.getCalcul = (req, res) => {
    res.render('calcul', { isLog: req.session.isLog });
}
exports.postCalcul = (req, res) => {
    // 1. On récupère les valeurs du formulaire
    const programme = req.body.programme;
    const valeur = req.body.valeur;
    const nb_process = req.body.nb_process;

    // 2. Simulation de calcul (2 secondes)
    setTimeout(() => {
        // CORRECTION : Utilise les variables définies juste au-dessus
        const messageResultat = `Le programme ${programme} a été exécuté avec la valeur ${valeur} sur ${nb_process} processus.`;
        
        res.render('calcul', { 
            resultat: messageResultat,
            isLog: req.session.isLog, 
            error: null 
        });
    }, 2000);
};
