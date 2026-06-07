/* models import */
import User from '../../models/user.model.js'

export const update = (id, data) => {

    return User.findByIdAndUpdate(

        {_id: id},
        {$set: data}

    ).catch(err => error.internal(err))
}

export const updatePhoto = (id, photo) => {

    return User.findByIdAndUpdate(

        {_id: id},
        {$set: {photo: photo}}

    ).catch(err => error.internal(err))
}

export const updatePwd = (id, pwdHash) => {

    return User.findByIdAndUpdate(

        {_id: id},
        {$set: {pwd: pwdHash}}

    ).catch(err => error.internal(err))
}