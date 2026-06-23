/* modules import */
import { Router } from 'express'

/* router config */
const router = Router()

/* helpers import */
import {admin as isAdmin} from '../../helpers/mvc.help.js'

/* controllers import */
import * as employerController from '../../controllers/admin/employer.controller.js'

/* routes */
router.get('/read', isAdmin, employerController.readEmployers)
router.post('/create', isAdmin, employerController.createEmployer)
router.post('/delete/:id', isAdmin, employerController.deleteEmployer)
router.post('/block/:id', isAdmin, employerController.blockEmployer)
router.post('/unblock/:id', isAdmin, employerController.unblockEmployer)


/* router export */
export default router