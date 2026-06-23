/* modules import */
import bcrypt from 'bcryptjs'

/* services import */
import * as employerService from '../../services/employer.service.js'
import { create as createEmployerService } from '../../services/user/crud.service.js'
import { delet as deleteEmployerService } from '../../services/user/crud.service.js'

/* middleware import */
import { internal } from '../../middlewares/error.middleware.js'

/* controllers */
export const readEmployers = (req, res) => {

    employerService.read().then((employers) => {

        res.render('admin/employers', { employers })

    }).catch(err => internal(err, '/user/profile', true, false))
}

export const createEmployer = async (req, res) => {

    const data = {
        name: req.body.updateName,
        tel: req.body.updateTel,
        pwd: 'instic2026'
    }

    data.pwd = await bcrypt.hash(data.pwd, 10)

    console.log(data)

    await createEmployerService(data).then(() => {

        req.flash('success_msg', 'Funcionário Cadastrado')
        res.redirect('/admin/employers/read')

    }).catch(err => internal(err, '/admin/employers/read', true, false))
}

export const deleteEmployer = (req, res) => {

    deleteEmployerService(req.params.id).then(() => {

        req.flash('success_msg', 'Funcionário Deletado')
        res.redirect('/admin/employers/read')

    }).catch(err => internal(err, '/admin/employers/read', true, false))
}