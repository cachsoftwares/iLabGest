/* modules import */
import { Router } from 'express'

/* router config */
const router = Router()

/* controllers import */
import * as userControllers from '../../controllers/user/user.controller.js'

/* routes */
router.get('/sign', userControllers.sign)

/* router export */
export default router