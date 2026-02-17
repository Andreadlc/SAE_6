exports.getAuth = (req, res) => {
    // On récupère le message d'erreur s'il y en a un dans la session
    const errorMsg = req.session.error;
    // On le supprime de la session pour ne pas qu'il s'affiche à l'infini
    req.session.error = null;

    res.render('login', { 
        isLog: req.session.isLog, 
        error: errorMsg // On passe l'erreur à la vue EJS
    });
}
// Notre base de données temporaire
const users = []; 

exports.getRegister = (req, res) => {
    res.render('register', { isLog: req.session.isLog });
};

exports.postRegister = (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // 1. Vérification des mots de passe
    if (password !== confirmPassword) {
        req.session.error = "Les mots de passe ne correspondent pas.";
        return res.redirect('/register');
    }

    // 2. Vérification si l'utilisateur existe déjà
    const alreadyExists = users.find(u => u.username === username);
    if (alreadyExists) {
        req.session.error = "Ce nom d'utilisateur est déjà pris.";
        return res.redirect('/register');
    }

    // 3. "Sauvegarde" dans notre tableau
    users.push({ username: username, password: password });
    console.log("Utilisateurs en mémoire :", users);

    res.redirect('/auth');
};

exports.postAuth = (req, res) => {
    const { username, password } = req.body;

    // 4. Recherche de l'utilisateur dans le tableau
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.isLog = true;
        req.session.user = username;
        res.redirect('/');
    } else {
        req.session.error = "Identifiants incorrects.";
        res.redirect('/auth');
    }
};

exports.getLogout = (req, res) => {
    // Cette fonction détruit la session côté serveur
    req.session.destroy((err) => {
        if (err) {
            console.log("Erreur lors de la déconnexion :", err);
        }
        // Une fois détruite, on renvoie à l'accueil
        res.redirect('/'); 
    });
};