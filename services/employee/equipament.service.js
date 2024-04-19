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