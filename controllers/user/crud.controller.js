/* modules import */
import bcrypt from 'bcryptjs'

/* services import */
import * as UserServices from '../../services/user/crud.service.js'

/* middlewares import */
import * as error from '../../middlewares/error.middleware.js'

export const updateUser = (req, res) => {

    /* get data */
    const data = {
        name: req.body.updateName,
        tel: req.body.updateTel,
    }

    /* validation */
    if (
        !data.name || data.name == undefined || data.name == null
        ||
        !data.tel || data.tel == undefined || data.tel == null
    ) {

        error.fillFields('/user/profile', true)

    } else {

        /* call service */
        UserServices.update(req.user._id, data).then(() => {

            req.flash('info_msg', 'Dados Atualizados')
            res.redirect('/user/profile')

        }).catch(err => error.internal(err, '/user/profile', true, false))

    }
}

export const updateUserPhoto = (req, res) => {

    /* get foto */
    const foto = req.body.updatePhotoText

    /* validation */
    if (!foto || foto == null || foto == undefined) {

        error.fillFields('/user/profile', true)

    } else {

        /* call service */
        UserServices.updatePhoto(req.user._id, foto).then(() => {

            req.flash('info_msg', 'Foto Atualizada')
            res.redirect('/user/profile')

        }).catch(err => error.internal(err, '/user/profile', true, false))
    }
}

export const updateUserPwd = (req, res) => {

    /* get data */
    const data = {
        pwdCurrent: req.body.updatePwdCurrent,
        pwdNew: req.body.updatePwdNew,
        pwdNewAgain: req.body.updatePwdNewAgain
    }

    /* validation */
    if (
        !data.pwdCurrent || data.pwdCurrent == undefined || data.pwdCurrent == null
        ||
        !data.pwdNew || data.pwdNew == undefined || data.pwdNew == null
        ||
        !data.pwdNewAgain || data.pwdNewAgain == undefined || data.pwdNewAgain == null
    ) {

        error.fillFields('/user/profile', true)

    } else if (data.pwdCurrent == data.pwdNew) {

        error.general('Nova Senha igual a Atual', '/user/profile', true, false, false)

    } else if (data.pwdNew != data.pwdNewAgain) {

        error.general('Navas Senhas Diferentes', '/user/profile', true, false)

    } else {

        /* validation user pwd */
        bcrypt.compare(data.pwdCurrent, req.user.pwd, (err, match) => {

            if (err) { error.internal(err, '/user/profile', true, true) }

            if (match) {

                bcrypt.hash(data.pwdNew, 10, (err, hash) => {

                    if(err) {
                        error.internal(err, '/user/profile', true, true)
                    }

                    /* call service */
                    UserServices.update(req.user._id, hash).then(() => {

                        req.flash('info_msg', 'Dados Atualizados')
                        res.redirect('/user/profile')

                    }).catch(err => {error.internal(err, '/user/profile', true, false)})
                })

            } else { wrongPwd('/user/profile', false) }
        })
    }
}