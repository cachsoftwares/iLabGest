/* modules import */
import bcrypt from 'bcryptjs'

/* models import */
import User from '../models/user.model.js'

export default async function createAdminIfNotExist() {

    /* get data */
    const data = {
        name: 'Administrador do Sistema',
        tel: '923100100',
        pwd: process.env.ADMIN_PWD,
        role: 'Administrador'
    }

    /* crypto pwd */
    await bcrypt.hash(data.pwd, 10, async (err, hash) => {

        if (err) {
            
            console.log(`Erro Interno: ${err}`)
            return
        }

        data.pwd = hash

        /* save into db */
        await new User(data).save().then(() => {

            console.log('Admin created')

        }).catch(err => console.log(`Erro Interno: ${err}`))
    })

}