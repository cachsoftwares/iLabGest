/* models import */
import User from '../models/user.model.js'

/* middlewares import */
import { internal } from '../middlewares/error.middleware.js'

/* services */
export const read = () => {

    return User.find().catch(err => internal(err))
}