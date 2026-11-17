import mongoose from 'mongoose'
import Equipament, { equipamentStatuses } from '../../models/equipament.model.js'
import Inventory from '../../models/inventory.model.js'
import Laboratory from '../../models/laboratory.model.js'

export const read = () => {
    return Inventory
        .find()
        .sort({ startedAt: -1 })
        .populate('employee', 'name tel')
        .lean()
}

export const count = () => Inventory.countDocuments()

export const readLaboratories = () => {
    return Laboratory
        .find()
        .sort({ title: 1 })
        .lean()
}

export const readById = (id) => {
    if (!mongoose.isValidObjectId(id)) return null

    return Inventory
        .findById(id)
        .populate('employee', 'name tel')
        .lean()
}

export const create = async (laboratoryIds, employeeId) => {
    const ids = [...new Set(laboratoryIds.map(id => String(id).toLowerCase()))]
    if (ids.length === 0 || ids.some(id => !mongoose.isValidObjectId(id))) return null

    const laboratories = await Laboratory.find({ _id: { $in: ids } }).lean()
    if (laboratories.length !== ids.length) return null

    const laboratoriesById = new Map(laboratories.map(laboratory => [String(laboratory._id), laboratory]))
    const selectedLaboratories = ids.map(id => laboratoriesById.get(id))
    const equipments = await Equipament
        .find({ laboratory: { $in: ids } })
        .select('title category status laboratory')
        .sort({ title: 1 })
        .lean()

    return new Inventory({
        laboratories: selectedLaboratories.map(laboratory => ({
            laboratory: laboratory._id,
            title: laboratory.title,
            area: laboratory.area
        })),
        employee: employeeId,
        items: equipments.map(equipment => ({
            equipment: equipment._id,
            title: equipment.title,
            category: equipment.category,
            laboratoryTitle: laboratoriesById.get(String(equipment.laboratory)).title,
            statusAtStart: equipment.status
        }))
    }).save()
}

export const checkIn = async (inventoryId, itemId, status, note) => {
    if (!equipamentStatuses.includes(status)) return { ok: false, reason: 'invalid-status' }
    if (!mongoose.isValidObjectId(inventoryId) || !mongoose.isValidObjectId(itemId)) {
        return { ok: false, reason: 'not-available' }
    }

    const filter = {
        _id: inventoryId,
        status: 'Em curso',
        items: { $elemMatch: { _id: itemId, checkedIn: false } }
    }
    const inventory = await Inventory.findOne(filter).select('items')
    if (!inventory) return { ok: false, reason: 'not-available' }

    const item = inventory.items.id(itemId)
    if (!item) return { ok: false, reason: 'not-available' }

    const checkedInAt = new Date()
    const updatedInventory = await Inventory.findOneAndUpdate(
        filter,
        {
            $set: {
                'items.$.checkedIn': true,
                'items.$.statusAtCheckIn': status,
                'items.$.checkedInAt': checkedInAt,
                'items.$.note': note
            }
        },
        { new: true, runValidators: true }
    )
    if (!updatedInventory) return { ok: false, reason: 'not-available' }

    const rollbackCheckIn = async () => {
        const rollback = await Inventory.updateOne({
            _id: inventoryId,
            items: { $elemMatch: { _id: itemId, checkedIn: true, checkedInAt } }
        }, {
            $set: { 'items.$.checkedIn': false },
            $unset: {
                'items.$.statusAtCheckIn': '',
                'items.$.checkedInAt': '',
                'items.$.note': ''
            }
        })
        if (rollback.modifiedCount !== 1) {
            throw new Error('Could not roll back the check-in after the equipment update failed.')
        }
    }

    let equipment
    try {
        equipment = await Equipament.findByIdAndUpdate(
            item.equipment,
            { $set: { status } },
            { new: true, runValidators: true }
        )
    } catch (error) {
        await rollbackCheckIn()
        throw error
    }

    if (!equipment) {
        await rollbackCheckIn()
        return { ok: false, reason: 'equipment-not-found' }
    }

    return { ok: true }
}

export const checkInByEquipment = async (inventoryId, equipmentId, status, note) => {
    if (!mongoose.isValidObjectId(inventoryId) || !mongoose.isValidObjectId(equipmentId)) {
        return { ok: false, reason: 'not-available' }
    }

    const inventory = await Inventory.findOne({
        _id: inventoryId,
        status: 'Em curso',
        items: { $elemMatch: { equipment: equipmentId, checkedIn: false } }
    }).select('items')

    const item = inventory?.items.find(entry => String(entry.equipment) === String(equipmentId))
    if (!item) return { ok: false, reason: 'not-available' }

    return checkIn(inventoryId, String(item._id), status, note)
}

export const close = (id) => {
    if (!mongoose.isValidObjectId(id)) return null

    return Inventory.findOneAndUpdate(
        { _id: id, status: 'Em curso' },
        { $set: { status: 'Concluído', completedAt: new Date() } },
        { new: true, runValidators: true }
    )
}
