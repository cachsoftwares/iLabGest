/* modules import */
import { Router } from 'express'
import multer from 'multer'

/* router config */
const router = Router()

/* multer config */
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/files/img/users')
    },
    filename: function (req, file, callback) {

        const extensao = file.originalname.split('.')[1]

        const newName = file.originalname

        callback(null, `${newName}`)
    }
})

var upload = multer({ storage: storage })

/* controllers import */
import * as userControllers from '../../controllers/user/user.controller.js'
import * as userCrudControllers from '../../controllers/user/crud.controller.js'

/* routes */
router.get('/sign', userControllers.sign)
router.post('/sign/in', userControllers.signin)
router.post('/sign/out', userControllers.signout)

router.get('/profile', userControllers.profile)

router.post('/update', userCrudControllers.updateUser)
router.post('/update/photo', upload.single('updatePhoto'), userCrudControllers.updateUserPhoto)
router.post('/update/pwd', userCrudControllers.updateUserPwd)

/* router export */
export default router