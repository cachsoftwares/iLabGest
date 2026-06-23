/* services import */
import * as laboratoryService from '../../services/employee/laboratory.service.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

export const readLaboratory = (req, res) => {

    laboratoryService.read().then(laboratories => {

        res.render('employee/laboratory', {laboratories})

    }).catch(err => internal(err, '/employee/laboratory/read', true, false))
}