/* modules import */
import express from 'express'
import dotenv from 'dotenv'

/* app config */
const app = express()

/* dotenv config */
dotenv.config()

/* app listen */
app.listen(process.env.PORT, () => console.log(`Server Fly - http://localhost:${process.env.PORT}`))