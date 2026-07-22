/* models import */
import Equipament from '../../models/equipament.model.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

/* services */
export const read = () => {

    return Equipament
        .find()
        .lean()
        .catch(err => internal(err, false, false, false))
}

export const create = (data) => {

    console.log('data do service', data)

    return new Equipament(data)
        .save()
        .catch(err => internal(err, false, false, false))
}