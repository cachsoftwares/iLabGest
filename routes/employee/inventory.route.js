import { Router } from 'express'
import { employee as isEmployee } from '../../helpers/mvc.help.js'
import * as inventoryController from '../../controllers/employee/inventory.controller.js'

const router = Router()

router.get('/read', isEmployee, inventoryController.readInventories)
router.post('/create', isEmployee, inventoryController.createInventory)
router.get('/:id', isEmployee, inventoryController.readInventory)
router.post('/:id/checkin', isEmployee, inventoryController.checkInEquipment)
router.post('/:id/checkin/qr', isEmployee, inventoryController.checkInEquipmentByQr)
router.post('/:id/close', isEmployee, inventoryController.closeInventory)

export default router
