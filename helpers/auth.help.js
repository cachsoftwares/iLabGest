import passportLocal from 'passport-local'
import bcrypt from 'bcryptjs'

const localStrategy = passportLocal.Strategy

import User from '../models/user.model.js'

export default function(passport) {

    passport.use(new localStrategy(
        {usernameField: 'signinTel', passwordField: 'signinPwd'},
        (tel, pwd, done) => {

            //const telFormat = tel.toString().replaceAll(' ', '')
            //console.log('telFormat: ' + telFormat)

            User.findOne({tel: tel}).then(user => {

                if(!user) {

                    return done(null, false, {message: 'Conta não Existe'})
                }

                if(user.status == 'Bloqueado') {

                    return done(null, false, {message: 'Conta Bloqueada'})
                }

                bcrypt.compare(pwd, user.pwd, (err, match) => {

                    if(err) {
                        console.log(`Erro Interno: ${err}`)
                        return
                    }
                    
                    if(match) {

                        return done(null, user)
                        
                    } else { return done(null, false, {message: 'Senha Errada'}) }
                })

            }).catch(err => {

                console.log('Erro Interno: ' + err)
                return done(null, false, {message: 'Erro Interno'})
            })
        }
    ))

    passport.serializeUser((user, done) => {

        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {

        User.findById(id).lean().then(user => {

            done(null, user)

        }).catch(err => { done(err, null) })
    })
}