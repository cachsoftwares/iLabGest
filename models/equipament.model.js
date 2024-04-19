import mongoose from 'mongoose'

const EquipamentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Novo', 'Bom', 'Reciclado', 'Defeituoso', 'Inoperante'],
        default: 'Novo'
    },
    category: {
        type: String,
        enum: ['Desktop', 'Laptop', 'Router', 'Mouse', 'Teclado', 'Monitor'],
        default: 'Desktop'
    },
    price: {
        type: Number,
        required: true
    },
    photo: {
        type: String/*,
        required: true*/
    },
    supplier: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    useFulLife: {
        type: Number
    },
    dates: {
        purchaseDate: {
            type: Date,
            required: true
        },
        manufaturingDate: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    laboratory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laboratory'
    }
})

const Equipament = mongoose.model('Equipament', EquipamentSchema)

export default Equipament