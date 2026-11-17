import * as inventoryService from '../../services/employee/inventory.service.js'
import { parseEquipmentQrPayload } from '../../helpers/equipment-qr.help.js'

const formatDate = date => date
    ? new Intl.DateTimeFormat('pt-PT', { dateStyle: 'short', timeStyle: 'short' }).format(date)
    : ''

const formatPdfFileName = date => {
    const datePart = new Intl.DateTimeFormat('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date).replace(/\//g, '-')

    return `Inventario-${datePart}`
}

export const readInventories = async (req, res) => {
    const [inventories, laboratories] = await Promise.all([
        inventoryService.read(),
        inventoryService.readLaboratories()
    ])

    const inventoryRows = inventories.map(inventory => {
        const checkedInCount = inventory.items.filter(item => item.checkedIn).length
        return {
            ...inventory,
            startedAtLabel: formatDate(inventory.startedAt),
            completedAtLabel: formatDate(inventory.completedAt),
            checkedInCount,
            unverifiedCount: inventory.items.length - checkedInCount
        }
    })

    res.render('employee/inventories', {
        inventories: inventoryRows,
        laboratories,
        hasLaboratories: laboratories.length > 0
    })
}

export const createInventory = async (req, res) => {
    const laboratoryIds = req.body.laboratories
        ? [].concat(req.body.laboratories)
        : []

    if (laboratoryIds.length === 0) {
        req.flash('error_msg', 'Selecione pelo menos um laboratório.')
        return res.redirect('/employee/inventory/read')
    }

    const inventory = await inventoryService.create(laboratoryIds, req.user._id)
    if (!inventory) {
        req.flash('error_msg', 'Não foi possível iniciar o inventário com os laboratórios selecionados.')
        return res.redirect('/employee/inventory/read')
    }

    req.flash('success_msg', 'Inventário iniciado. Faça o check-in dos equipamentos.')
    res.redirect(`/employee/inventory/${inventory._id}`)
}

export const readInventory = async (req, res) => {
    const inventory = await inventoryService.readById(req.params.id)
    if (!inventory) {
        req.flash('error_msg', 'Inventário não encontrado.')
        return res.redirect('/employee/inventory/read')
    }

    const checkedInCount = inventory.items.filter(item => item.checkedIn).length
    const items = inventory.items.map(item => ({
        ...item,
        checkedInAtLabel: formatDate(item.checkedInAt)
    }))

    res.render('employee/inventory', {
        inventory: {
            ...inventory,
            startedAtLabel: formatDate(inventory.startedAt),
            pdfFileName: formatPdfFileName(inventory.startedAt),
            completedAtLabel: formatDate(inventory.completedAt),
            checkedInCount,
            unverifiedCount: inventory.items.length - checkedInCount,
            items
        }
    })
}

export const checkInEquipment = async (req, res) => {
    const note = typeof req.body.note === 'string' ? req.body.note.trim() : ''
    if (note.length > 500) {
        req.flash('error_msg', 'A nota deve ter no máximo 500 caracteres.')
        return res.redirect(`/employee/inventory/${req.params.id}`)
    }

    const result = await inventoryService.checkIn(
        req.params.id,
        req.body.itemId,
        req.body.status,
        note
    )

    return finishCheckIn(req, res, result)
}

export const checkInEquipmentByQr = async (req, res) => {
    const equipmentId = parseEquipmentQrPayload(req.body.qrValue)
    if (!equipmentId) {
        req.flash('error_msg', 'O código QR não é reconhecido pelo iLabGest.')
        return res.redirect(`/employee/inventory/${req.params.id}`)
    }

    const note = typeof req.body.note === 'string' ? req.body.note.trim() : ''
    if (note.length > 500) {
        req.flash('error_msg', 'A nota deve ter no máximo 500 caracteres.')
        return res.redirect(`/employee/inventory/${req.params.id}`)
    }

    const result = await inventoryService.checkInByEquipment(
        req.params.id,
        equipmentId,
        req.body.status,
        note
    )

    return finishCheckIn(req, res, result)
}

const finishCheckIn = (req, res, result) => {
    if (result.ok) {
        req.flash('success_msg', 'Check-in registado e estado do equipamento atualizado.')
    } else if (result.reason === 'invalid-status') {
        req.flash('error_msg', 'Selecione um estado de conservação válido.')
    } else if (result.reason === 'equipment-not-found') {
        req.flash('error_msg', 'O equipamento já não existe; o check-in não foi concluído.')
    } else {
        req.flash('error_msg', 'Este equipamento não pertence a esta sessão, já foi conferido ou o inventário foi fechado.')
    }

    res.redirect(`/employee/inventory/${req.params.id}`)
}

export const closeInventory = async (req, res) => {
    const inventory = await inventoryService.close(req.params.id)
    if (!inventory) {
        req.flash('error_msg', 'Inventário não encontrado ou já concluído.')
        return res.redirect('/employee/inventory/read')
    }

    req.flash('success_msg', 'Inventário concluído. O relatório está pronto para exportação.')
    res.redirect(`/employee/inventory/${inventory._id}`)
}
