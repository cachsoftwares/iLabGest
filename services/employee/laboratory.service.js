/* models import */
import Laboratory from '../../models/laboratory.model.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

export const read = () => {

    return Laboratory
        .find()
        .lean()
        .catch(err => internal(err, false, false, false))
}

export const create = (data) => {

    return new Laboratory(data)
        .save()
        .catch(err => internal(err, false, false, false))
}

export const delet = (id) => {

    return Laboratory
        .findByIdAndDelete({_id: id})
        .catch(err => internal(err, false, false, false))
}