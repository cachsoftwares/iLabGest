/* modules import */
import { Router } from 'express'

/* router config */
const router = Router()

/* helpers import */
import {admin as isAdmin} from '../../helpers/mvc.help.js'

/* controllers import */
import * as employeeController from '../../controllers/admin/employee.controller.js'

/* routes */
router.get('/read', isAdmin, employeeController.readEmployees)
router.post('/create', isAdmin, employeeController.createEmployee)
router.post('/delete/:id', isAdmin, employeeController.deleteEmployee)
router.post('/block/:id', isAdmin, employeeController.blockEmployee)
router.post('/unblock/:id', isAdmin, employeeController.unblockEmployee)


/* router export */
export default router