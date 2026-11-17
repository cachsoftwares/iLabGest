import mongoose from 'mongoose'
import QRCode from 'qrcode'
import Equipament from '../../models/equipament.model.js'
import { equipmentQrPayload } from '../../helpers/equipment-qr.help.js'

/* services import */
import * as equipamentService from '../../services/employee/equipament.service.js'
import { read as laboratoriesRead } from '../../services/employee/laboratory.service.js'

/* middlewares import */
import { internal, fillFields } from '../../middlewares/error.middleware.js'

/* controllers */
export const readEquipament = (req, res) => {

    equipamentService.read().then(equipaments => {

        laboratoriesRead().then(laboratories => {
            
            res.render('employee/equipament', { equipaments, laboratories })

        }).catch(err => internal(err, '/user/profile', true, false))

    }).catch(err => internal(err, '/user/profile', true, false))
}

export const readEquipamentQr = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.sendStatus(404)

    const equipament = await Equipament
        .findById(req.params.id)
        .select('title category')
        .lean()

    if (!equipament) return res.sendStatus(404)
    res.render('employee/equipament-qr', { equipament })
}

export const readEquipamentQrSvg = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.sendStatus(404)

    const equipament = await Equipament.findById(req.params.id).select('_id').lean()
    if (!equipament) return res.sendStatus(404)

    const svg = await QRCode.toString(equipmentQrPayload(equipament._id), {
        type: 'svg',
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 320
    })

    res.type('image/svg+xml').send(svg)
}

export const downloadEquipamentQrPng = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.sendStatus(404)

    const equipament = await Equipament.findById(req.params.id).select('_id').lean()
    if (!equipament) return res.sendStatus(404)

    const png = await QRCode.toBuffer(equipmentQrPayload(equipament._id), {
        type: 'png',
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 640
    })

    res.type('image/png')
        .set('Content-Disposition', `attachment; filename="qrcode-equipamento-${equipament._id}.png"`)
        .send(png)
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

export const deleteEquipament = (req, res) => {

    const id = req.params.id

    equipamentService.delet(id).then(() => {

        req.flash('success_msg', 'Equipamento Deletado')
        res.redirect('/employee/equipament/read')

    }).catch(err => internal(err, '/employee/equipament/read', true, false))
}

export const updateEquipament = (req, res) => {

    const id = req.body.updateEquipamentId

    const data = {
        title: req.body.updateEquipamentTitle,
        status: req.body.updateEquipamentStatus,
        category: req.body.updateEquipamentCategory,
        price: req.body.updateEquipamentPrice,
        supplier: req.body.updateEquipamentSupplier,
        brand: req.body.updateEquipamentBrand,
        note: req.body.updateEquipamentNote,
        useFulLife: req.body.updateEquipamentUseFulLife,
        'dates.purchaseDate': req.body.updateEquipamentPurchaseDate,
        'dates.manufaturingDate': req.body.updateEquipamentManufaturingDate,
        laboratory: req.body.updateEquipamentLaboratory
    }

    equipamentService.update(id, data).then(() => {

        req.flash('success_msg', 'Equipamento Atualizado')
        res.redirect('/employee/equipament/read')

    }).catch(err => internal(err, '/employee/equipament/read', true, false))
}

export const updateEquipamentPhoto = (req, res) => {

    const id = req.body.updateEquipamentId

    /* get foto */
    const foto = req.body.updateEquipamentPhotoText

    /* validation */
    if (!foto || foto == null || foto == undefined) {

        fillFields('/employee/equipament/read', true)

    } else {

        /* call service */
        equipamentService.updatePhoto(id, foto).then(() => {

            req.flash('info_msg', 'Foto Atualizada')
            res.redirect('/employee/equipament/read')

        }).catch(err => internal(err, '/employee/equipament/read', true, false))
    }
}