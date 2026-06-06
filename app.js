/* modules import */
import express from 'express'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import path from 'path'
import {fileURLToPath} from 'url'
import mongoose from 'mongoose'

/* app config */
const app = express()

/* dotenv config */
dotenv.config()

/* handlebars config */
const hdb = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs'
})

app.engine('hbs', hdb.engine)
app.set('view engine', 'hbs')

/* filename & dirname */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* static files */
app.use(express.static(path.join(__dirname, 'public')))

/* mongodb connect */
import mongoConnect from './config/database.js'
mongoConnect()

/* controllers import */
import * as appControllers from './controllers/app/app.controller.js'

/* internal routes */
app.get('/', appControllers.inicio)

/* external routes */
import userRoutes from './routes/user/user.route.js'

app.use('/user', userRoutes)

/* app listen */
app.listen(process.env.PORT, () => console.log(`Server Fly - http://localhost:${process.env.PORT}`))