exports.getAuth = (req, res) => {
    res.render('login', { isLog: req.session.isLog });
}

exports.postAuth = (req, res) => {
    const { username, password } = req.body;
}
