/* modules import */
import passport from 'passport'

/* controllers */
export const sign = (req, res) => {

    res.render('user/sign')
}

export const signin = (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/user/profile',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
}