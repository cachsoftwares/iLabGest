/* models import */
import User from '../../models/user.model.js'

/* middleware imports */
import {internal} from '../../middlewares/error.middleware.js'

export const create = (data) => {

    return new User(data).catch(err => internal(err, false, false, false))
}

export const update = (id, data) => {

    return User.findByIdAndUpdate(

        {_id: id},
        {$set: data}

    ).catch(err => internal(err, false, false, false))
}

export const updatePhoto = (id, photo) => {

    return User.findByIdAndUpdate(

        {_id: id},
        {$set: {photo: photo}}

    ).catch(err => internal(err, false, false, false))
}

export const updatePwd = (id, pwdHash) => {

    return User.findByIdAndUpdate(

        {_id: id},
        {$set: {pwd: pwdHash}}

    ).catch(err => internal(err, false, false, false))
}