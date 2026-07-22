/* modules import */
import bcrypt from 'bcryptjs'

/* services import */
import * as employeeService from '../../services/employee.service.js'
import {
    create as createEmployeeService,
    delet as deleteEmployeeService,
    block as blockEmployeeService,
    unblock as unblockEmployeeService
} from '../../services/user/crud.service.js'

/* middleware import */
import { internal } from '../../middlewares/error.middleware.js'

/* controllers */
export const readEmployees = (req, res) => {

    employeeService.read().then((employees) => {

        res.render('admin/employees', { employees })

    }).catch(err => internal(err, '/user/profile', true, false))
}

export const createEmployee = async (req, res) => {

    const data = {
        name: req.body.createEmployeeName,
        tel: req.body.createEmployeeTel,
        pwd: 'instic2026'
    }

    data.pwd = await bcrypt.hash(data.pwd, 10)

    console.log(data)

    await createEmployeeService(data).then(() => {

        req.flash('success_msg', 'Funcionário Cadastrado')
        res.redirect('/admin/employees/read')

    }).catch(err => internal(err, '/admin/employees/read', true, false))
}

export const deleteEmployee = (req, res) => {

    deleteEmployeeService(req.params.id).then(() => {

        req.flash('success_msg', 'Funcionário Deletado')
        res.redirect('/admin/employees/read')

    }).catch(err => internal(err, '/admin/employees/read', true, false))
}

export const blockEmployee = (req, res) => {

    blockEmployeeService(req.params.id).then(() => {

        req.flash('success_msg', 'Funcionário Bloquado')
        res.redirect('/admin/employees/read')

    }).catch(err => internal(err, '/admin/employees/read', true, false))
}

export const unblockEmployee = (req, res) => {

    unblockEmployeeService(req.params.id).then(() => {

        req.flash('success_msg', 'Funcionário Desbloquado')
        res.redirect('/admin/employees/read')

    }).catch(err => internal(err, '/admin/employees/read', true, false))
}