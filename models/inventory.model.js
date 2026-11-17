import mongoose from 'mongoose'
import { equipamentStatuses } from './equipament.model.js'

const InventoryLaboratorySchema = new mongoose.Schema({
    laboratory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laboratory',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    }
}, { _id: false })

const InventoryItemSchema = new mongoose.Schema({
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipament',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    laboratoryTitle: {
        type: String,
        required: true
    },
    statusAtStart: {
        type: String,
        enum: equipamentStatuses,
        required: true
    },
    checkedIn: {
        type: Boolean,
        default: false
    },
    statusAtCheckIn: {
        type: String,
        enum: equipamentStatuses
    },
    checkedInAt: {
        type: Date
    },
    note: {
        type: String,
        maxlength: 500
    }
})

const InventorySchema = new mongoose.Schema({
    laboratories: {
        type: [InventoryLaboratorySchema],
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Em curso', 'Concluído'],
        default: 'Em curso',
        required: true
    },
    startedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    completedAt: {
        type: Date
    },
    items: {
        type: [InventoryItemSchema],
        default: []
    }
}, { timestamps: true })

const Inventory = mongoose.model('Inventory', InventorySchema)

export default Inventory
