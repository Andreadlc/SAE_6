exports.getJustePrix = (req, res) => {
    res.render('justeprix', { isLog: req.session.isLog,userRole: req.session.user.role });
}

