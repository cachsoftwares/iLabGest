/* modules import */
import mongoose from 'mongoose'

export default function mongoConnect() {

    const MongoURI = process.env.PORT ? process.env.MONGO_URI_CLOUD : process.env.MONGO_URI_LOCAL

    return mongoose.connect(MongoURI).then(() => {

        console.log('MongoDB Connected')
        // wait createAdminIfNotExist()

    }).catch(err => console.log(`MongoDB Error: ${err}`))
}