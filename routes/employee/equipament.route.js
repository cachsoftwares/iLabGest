/* modules import */
import { Router } from 'express'

/* helpers import */
import { employee as isEmployee } from '../../helpers/mvc.help.js'

/* controllers import */
import * as equipamentController from '../../controllers/employee/equipament.controller.js'

const router = Router()

router.get('/read', isEmployee, equipamentController.readEquipament)
router.post('/create', isEmployee, equipamentController.createEquipament)
router.post('/delete/:id', isEmployee, equipamentController.deleteEquipament)

export default router