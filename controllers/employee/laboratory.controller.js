/* services import */
import * as laboratoryService from '../../services/employee/laboratory.service.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

export const readLaboratory = (req, res) => {

    laboratoryService.read().then(laboratories => {

        res.render('employee/laboratory', {laboratories})

    }).catch(err => internal(err, '/employee/laboratory/read', true, false))
}

export const createLaboratory = (req, res) => {

    const data = {
        title: req.body.createLaboratoyTitle,
        area: req.body.createLaboratoryArea
    }

    laboratoryService.create(data).then(() => {

        req.flash('success_msg', 'Laboratório Cadastrado')
        res.redirect('/employee/laboratory/read')

    }).catch(err => internal(err, '/employee/laboratory/read', true, false))
}