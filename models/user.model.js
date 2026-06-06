/* modules import */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

/* Schema */
const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: 'avatar.png'
    },
    status: {
        type: String,
        enum: ['Offline', 'Online', 'Bloqueado'],
        default: 'Offline'
    },
    role: {
        type: String,
        enum: ['Funcionário', 'Administrador'],
        default: 'Funcionário'
    },
    date: {
        create: {
            type: Date,
            default: Date.now
        }
    }
})

const User = mongoose.model('User', UserSchema)

export default User