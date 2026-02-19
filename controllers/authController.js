const User = require('../models/user')// 1. On importe le modèle
const bcrypt = require('bcrypt');
const saltRounds = 10; // Facteur de travail

exports.getAuth = (req, res) => {
    const errorMsg = req.session.error;
    req.session.error = null;
    
    // Sécurité : si session.user n'existe pas, on met 'guest'
    const role = (req.session.user && req.session.user.role) ? req.session.user.role : 'guest';

    res.render('login', { 
        isLog: req.session.isLog, 
        userRole: role, 
        error: errorMsg 
    });
};

exports.getRegister = (req, res) => {
    const errorMsg = req.session.error;
    req.session.error = null;

    const role = (req.session.user && req.session.user.role) ? req.session.user.role : 'guest';

    res.render('register', { 
        isLog: req.session.isLog, 
        userRole: role, 
        error: errorMsg 
    });
};

// 2. Ajout de "async" car on interagit avec la base de données
exports.postRegister = async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        req.session.error = "Les mots de passe ne correspondent pas.";
        return res.redirect('/register');
    }

    try {
        // 3. On vérifie si l'utilisateur existe dans MongoDB
        const alreadyExists = await User.findOne({ username: username });
        if (alreadyExists) {
            req.session.error = "Ce nom d'utilisateur est déjà pris.";
            return res.redirect('/register');
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. On crée et on sauvegarde le nouvel utilisateur
        const newUser = new User({
            username: username,
            password: hashedPassword // Plus tard, on verra pour "hasher" le mot de passe (sécurité)
        });

        await newUser.save(); 
        console.log("Utilisateur enregistré dans MongoDB !");
        res.redirect('/auth');

    } catch (err) {
        console.log(err);
        res.redirect('/register');
    }
};

// 5. Ajout de "async" ici aussi
exports.postAuth = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 6. On cherche l'utilisateur avec son pseudo ET son mot de passe
        const user = await User.findOne({ username: username});
        if (user) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                req.session.isLog = true;
                
                // IMPORTANT : On stocke un objet avec le role, pas juste le nom
                req.session.user = {
                    username: user.username,
                    role: user.role || 'user' // 'user' par défaut si pas de rôle en BD
                };
                
                res.redirect('/');
        }
        } else {
            req.session.error = "Identifiants incorrects.";
            res.redirect('/auth');
        }

    } catch (err) {
        console.log(err);
        res.redirect('/auth');
    }
};

exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/'); 
    });
};