import Equipament, { equipamentCategories, equipamentStatuses } from '../../models/equipament.model.js'
import Laboratory from '../../models/laboratory.model.js'
import User from '../../models/user.model.js'
import { count as countInventories } from './inventory.service.js'

export const readDashboard = async () => {
    const [counts, laboratories, employeeCount, inventoryCount] = await Promise.all([
        Equipament.aggregate([{
            $facet: {
                total: [{ $count: 'count' }],
                statuses: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
                categories: [{ $group: { _id: '$category', count: { $sum: 1 } } }],
                laboratories: [
                    { $match: { laboratory: { $ne: null } } },
                    { $group: { _id: '$laboratory', count: { $sum: 1 } } }
                ]
            }
        }]),
        Laboratory.find().select('title').sort({ title: 1 }).lean(),
        User.countDocuments({ role: 'Funcionário' }),
        countInventories()
    ])

    const chartCounts = counts[0]
    const countBy = entries => new Map(entries.map(entry => [String(entry._id), entry.count]))
    const statusCounts = countBy(chartCounts.statuses)
    const categoryCounts = countBy(chartCounts.categories)
    const laboratoryCounts = countBy(chartCounts.laboratories)

    return {
        totals: {
            employees: employeeCount,
            laboratories: laboratories.length,
            equipment: chartCounts.total[0]?.count || 0,
            inventories: inventoryCount
        },
        charts: {
            statuses: {
                labels: equipamentStatuses,
                data: equipamentStatuses.map(status => statusCounts.get(status) || 0)
            },
            categories: {
                labels: equipamentCategories,
                data: equipamentCategories.map(category => categoryCounts.get(category) || 0)
            },
            laboratories: {
                labels: laboratories.map(laboratory => laboratory.title),
                data: laboratories.map(laboratory => laboratoryCounts.get(String(laboratory._id)) || 0)
            }
        }
    }
}
