/* models import */
import Equipament from '../../models/equipament.model.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

/* services */
export const read = () => {

    return Equipament
        .find()
        .lean()
        .populate('employee')
        .catch(err => internal(err, false, false, false))
}

export const create = (data) => {

    console.log('data do service', data)

    return new Equipament(data)
        .save()
        .catch(err => internal(err, false, false, false))
}

export const delet = (id) => {

    return Equipament
        .findByIdAndDelete({_id: id})
        .catch(err => internal(err, '/employee/equipament/read', false, false))
}

export const update = (id, data) => {

    return Equipament.findByIdAndUpdate(

        {_id: id},
        {$set: data}

    ).catch(err => internal(err, '/employee/equipament/read', false, false))
}

export const updatePhoto = (id, photo) => {

    return Equipament.findByIdAndUpdate(

        {_id: id},
        {$set: {photo: photo}}

    ).catch(err => internal(err, '/employee/equipament/read', false, false))
}