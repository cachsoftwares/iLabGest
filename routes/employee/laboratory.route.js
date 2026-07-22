/* modules import */
import {Router} from 'express'

/* router config */
const router = Router()

/* helpers import */
import { employee as isEmployee } from '../../helpers/mvc.help.js'

/* controllers import */
import * as laboratoryController from '../../controllers/employee/laboratory.controller.js'

/* routes */
router.get('/read', isEmployee, laboratoryController.readLaboratory)
router.post('/create', isEmployee, laboratoryController.createLaboratory)
router.post('/delete/:id', isEmployee, laboratoryController.deleteLaboratory)
router.post('/update', isEmployee, laboratoryController.updateLaboratory)

/* router export */
export default router