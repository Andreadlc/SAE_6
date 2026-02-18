exports.getJustePrix = (req, res) => {
    res.render('justeprix', { isLog: req.session.isLog });
}

