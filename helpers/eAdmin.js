module.exports = {
    eAdmin: (req, res, next) => {
        if (req.isAuthenticaded() && req.user.eAdmin == 0) {
            return next()
        }

        req.flash('error_msg', 'Você precisa ser Admin')
        res.redirect('/')
    }
}