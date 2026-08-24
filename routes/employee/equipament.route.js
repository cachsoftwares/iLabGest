/* modules import */
import { Router } from 'express'
import multer from 'multer'

/* router config */
const router = Router()

/* multer config */
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/files/img/equipaments')
    },
    filename: function (req, file, callback) {

        const extensao = file.originalname.split('.')[1]

        const newName = file.originalname

        callback(null, `${newName}`)
    }
})

var upload = multer({ storage: storage })

/* helpers import */
import { employee as isEmployee } from '../../helpers/mvc.help.js'

/* controllers import */
import * as equipamentController from '../../controllers/employee/equipament.controller.js'

router.get('/read', isEmployee, equipamentController.readEquipament)
router.post('/create', isEmployee, equipamentController.createEquipament)
router.post('/delete/:id', isEmployee, equipamentController.deleteEquipament)
router.post('/update', isEmployee, equipamentController.updateEquipament)
router.post('/update/photo', isEmployee, upload.single('updateEquipamentPhoto'), equipamentController.updateEquipamentPhoto)

export default router