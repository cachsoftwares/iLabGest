/* modules import */
import { Router } from 'express'

/* controllers import */
import * as equipamentController from '../../controllers/employee/equipament.controller.js'

const router = Router()

router.get('/read', equipamentController.readEquipament)

export default router