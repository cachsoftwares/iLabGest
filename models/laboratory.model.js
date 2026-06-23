/* modules import */
import mongoose from 'mongoose'

const Schema = mongoose.Schema

/* Schema */
const LaboratorySchema = new Schema({

    title: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    }
})

const Laboratory = mongoose.model('Laboratory', LaboratorySchema)

export default Laboratory