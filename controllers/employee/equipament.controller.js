/* services import */
import * as equipamentService from '../../services/employee/equipament.service.js'
import { read as laboratoriesRead } from '../../services/employee/laboratory.service.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

/* controllers */
export const readEquipament = (req, res) => {

    equipamentService.read().then(equipaments => {

        laboratoriesRead().then(laboratories => {
            
            res.render('employee/equipament', { equipaments, laboratories })

        }).catch(err => internal(err, '/user/profile', true, false))

    }).catch(err => internal(err, '/user/profile', true, false))
}