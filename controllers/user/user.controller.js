/* modules import */
import passport from 'passport'

/* controllers */
export const sign = (req, res) => {

    res.render('user/sign')
}

export const signin = (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/sign',
        failureFlash: true
    })(req, res, next)
}

export const signout = (req, res) => {

    req.logout(err => {

        if(err) {

            console.log(`Erro Interno: ${err}`)
            req.flash('error_msg', 'Erro Interno')
            res.redirect('/user/profile')
        
        } else {

            req.flash('info_msg', 'Conta Fechada')
            res.redirect('/user/sign')
        }
    })
}

export const profile = (req, res) => {

    res.render('user/profile')
}