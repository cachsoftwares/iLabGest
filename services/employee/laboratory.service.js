/* models import */
import Laboratory from '../../models/laboratory.model.js'

/* middlewares import */
import { internal } from '../../middlewares/error.middleware.js'

export const read = () => {

    return Laboratory.find().catch(err => internal(err, false, false, false))
}