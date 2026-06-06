/* modules import */
import mongoose from 'mongoose'

/* helpers import */
import createAdminIfNotExist from './createAdmin.help.js'

export default function mongoConnect() {

    const MongoURI = process.env.PORT ? process.env.MONGO_URI_CLOUD : process.env.MONGO_URI_LOCAL

    return mongoose.connect(MongoURI).then(async () => {

        console.log('MongoDB Connected')
        await createAdminIfNotExist()

    }).catch(err => console.log(`MongoDB Error: ${err}`))
}