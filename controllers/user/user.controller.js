/* modules import */
import passport from 'passport'

/* models import */
import User from '../../models/user.model.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

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

    const userId = req.user._id

    req.logout(err => {

        if (err) {

            internal(err, '/user/profile', true, true)
        }

        User.findByIdAndUpdate(
            { _id: userId },
            { $set: { status: 'Offline' } }
        ).then(() => {

            req.flash('info_msg', 'Conta Fechada')
            res.redirect('/user/sign')

        }).catch(err => internal(err, '/user/sign', true, false))
    })
}

export const profile = async (req, res) => {

    const user = await User.findOne({ _id: req.user._id })

    if (user.status != 'Online') {

        await User.findByIdAndUpdate(

            { _id: req.user._id },
            { $set: { status: 'Online' } }

        ).then(() => {

            res.render('user/profile')
            return

        }).catch(err => internal(err, '/', true, true))
    }

    res.render('user/profile')
}