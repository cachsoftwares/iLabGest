/* modules import */
import {Router} from 'express'

/* router config */
const router = Router()

/* helpers import */
import { employer as isEmployer } from '../../helpers/mvc.help.js'

/* controllers import */
import * as laboratoryController from '../../controllers/employee/laboratory.controller.js'

/* routes */
router.get('/read', isEmployer, laboratoryController.readLaboratory)
router.post('/create', isEmployer, laboratoryController.createLaboratory)
router.post('/delete/:id', isEmployer, laboratoryController.deleteLaboratory)

/* router export */
export default router