import { readDashboard } from '../../services/employee/dashboard.service.js'

/* controllers */
export const home = async (req, res) => {

    const dashboard = await readDashboard()
    res.render('home', dashboard)
}

export const about = (req, res) => {

    res.render('about')
}