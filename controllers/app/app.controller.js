import { count as countInventories } from '../../services/employee/inventory.service.js'

/* controllers */
export const home = async (req, res) => {

    const inventoryCount = await countInventories()
    res.render('home', { inventoryCount })
}

export const about = (req, res) => {

    res.render('about')
}