/* services import */
import * as employerService from '../../services/employer.service.js'
import { create as createEmployerService } from '../../services/user/crud.service.js'

/* middleware import */
import { internal } from '../../middlewares/error.middleware.js'

/* controllers */
export const readEmployers = (req, res) => {

    employerService.read().then((employers) => {

        res.render('admin/employers', {employers})

    }).catch(err => internal(err, '/user/profile', true, false))
}

export const createEmployer = (req, res) => {

    const data = {
        nome: req.body.nome,
        telefone: req.body.telefone,
    }

    createEmployerService(data).then(() => {

        req.flash('success_msg', 'Funcionário Cadastrado')
        res.redirect('/admin/employers/read')

    }).catch(err => internal(err, '/admin/employers/create', true, false))
}