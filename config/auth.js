module.exports = {
    ensureAuthenticated: (req,res,next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login in view');
        res.redirect('/users/login');
    }
}