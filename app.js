/* modules import */
import express from 'express'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import path from 'path'
import {fileURLToPath} from 'url'
import bodyParser from 'body-parser'
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

/* body-parser config */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

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

/* middlewares config */
app.use((req, res, next) => {
    res.locals.info_msg = req.flash('info_msg')
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

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