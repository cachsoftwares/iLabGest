/* modules import */
import { Router } from 'express'

/* router config */
const router = Router()

/* controllers import */
import * as employerController from '../../controllers/admin/employer.controller.js'

/* routes */
router.get('/read', employerController.readEmployers)
router.post('/create', employerController.createEmployer)
router.post('/delete/:id', employerController.deleteEmployer)
router.post('/block/:id', employerController.blockEmployer)
router.post('/unblock/:id', employerController.unblockEmployer)


/* router export */
export default router