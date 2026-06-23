/* modules import */
import {Router} from 'express'

/* router config */
const router = Router()

/* controllers import */
import * as laboratoryController from '../../controllers/employee/laboratory.controller.js'

/* routes */
router.get('/read', laboratoryController.readLaboratory)

/* router export */
export default router