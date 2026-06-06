/* modules import */
import express from 'express'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import path from 'path'
import {fileURLToPath} from 'url'
import session from 'express-session'
import passport from 'passport'
import flash from 'connect-flash'

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
import mongoConnect from './helpers/database.help.js'
mongoConnect()

/* session config */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

/* passport config */
import auth from './helpers/auth.help.js'
auth(passport)

app.use(passport.initialize())
app.use(passport.session())

/* flash config */
app.use(flash())

/* controllers import */
import * as appControllers from './controllers/app/app.controller.js'

/* internal routes */
app.get('/', appControllers.home)

/* external routes */
import userRoutes from './routes/user/user.route.js'

app.use('/user', userRoutes)

/* app listen */
const PORT = 3025 || process.env.PORT
app.listen(PORT, () => console.log(`Server Fly - http://localhost:${PORT}`))