/* modules import */
import express from 'express'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'

/* app config */
const app = express()

/* dotenv config */
dotenv.config()

/* handlebars config */
const hdb = handlebars.create({
    defaultLayout: 'main',
    extname: '.hbs'
})

app.engine('hdb', hdb.engine)
app.set('view engine', 'hdb')

/* controllers import */
import * as appControllers from './controllers/app/app.controller.js'

/* internal routes */
app.get('/', appControllers.inicio)

/* app listen */
app.listen(process.env.PORT, () => console.log(`Server Fly - http://localhost:${process.env.PORT}`))