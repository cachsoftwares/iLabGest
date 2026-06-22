/* services import */
import * as employerService from '../../services/employer.service.js'

/* middleware import */
import { internal } from '../../middlewares/error.middleware.js'

/* controllers */
export const readEmployers = (req, res) => {

    employerService.read().then((employers) => {

        res.render('admin/employers', {employers})

    }).catch(err => internal(err, '/user/profile', true, false))
}