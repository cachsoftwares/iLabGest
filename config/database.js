/* modules import */
import mongoose from 'mongoose'

export default function mongoConnect() {

    return mongoose.connect('mongodb://localhost/ilabgest').then(() => {

        console.log('MongoDB Connected')
        // wait createAdminIfNotExist()

    }).catch(err => console.log(`MongoDB Error: ${err}`))
}