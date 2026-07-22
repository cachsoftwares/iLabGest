/* services import */
import * as equipamentService from '../../services/employee/equipament.service.js'
import { read as laboratoriesRead } from '../../services/employee/laboratory.service.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

/* controllers */
export const readEquipament = (req, res) => {

    equipamentService.read().then(equipaments => {

        laboratoriesRead().then(laboratories => {
            
            res.render('employee/equipament', { equipaments, laboratories })

        }).catch(err => internal(err, '/user/profile', true, false))

    }).catch(err => internal(err, '/user/profile', true, false))
}

export const createEquipament = (req, res) => {

    const data = {
        title: req.body.title,
        status: req.body.status,
        category: req.body.category,
        price: req.body.price,
        photo: req.body.photo,
        supplier: req.body.supplier,
        brand: req.body.brand,
        note: req.body.note,
        useFulLife: req.body.useFulLife,
        'dates.purchaseDate': req.body.purchaseDate,
        'dates.manufaturingDate': req.body.manufaturingDate,
        laboratory: req.body.laboratory,
        employee: req.user._id
    }

    return equipamentService.create(data).then(() => {

        req.flash('success_msg', 'Equipamento Cadastrado')
        res.redirect('/employee/equipament/read')

    }).catch(err => internal(err, '/employee/equipament/create', true, false))
}