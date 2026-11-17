import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Equipament from '../models/equipament.model.js'
import Inventory from '../models/inventory.model.js'
import Laboratory from '../models/laboratory.model.js'
import User from '../models/user.model.js'

dotenv.config()

const laboratoryData = [
    { title: 'Laboratório de Informática 1', area: 'Bloco A - 1.º andar' },
    { title: 'Laboratório de Redes', area: 'Bloco B - 2.º andar' }
]

const equipamentData = [
    {
        title: 'Computador Desktop 01',
        status: 'Bom',
        category: 'Desktop',
        price: 450000,
        supplier: 'Tecnologia Angola',
        brand: 'Dell',
        note: 'Equipamento de demonstração',
        useFulLife: 5,
        dates: {
            purchaseDate: new Date('2024-01-15T00:00:00.000Z'),
            manufaturingDate: 2023
        },
        laboratoryTitle: 'Laboratório de Informática 1'
    },
    {
        title: 'Computador Laptop 01',
        status: 'Novo',
        category: 'Laptop',
        price: 620000,
        supplier: 'Tecnologia Angola',
        brand: 'Lenovo',
        note: 'Equipamento de demonstração',
        useFulLife: 5,
        dates: {
            purchaseDate: new Date('2025-03-10T00:00:00.000Z'),
            manufaturingDate: 2025
        },
        laboratoryTitle: 'Laboratório de Informática 1'
    },
    {
        title: 'Router de Rede 01',
        status: 'Bom',
        category: 'Router',
        price: 180000,
        supplier: 'Redes & Sistemas',
        brand: 'TP-Link',
        note: 'Equipamento de demonstração',
        useFulLife: 4,
        dates: {
            purchaseDate: new Date('2024-06-20T00:00:00.000Z'),
            manufaturingDate: 2024
        },
        laboratoryTitle: 'Laboratório de Redes'
    },
    {
        title: 'Monitor 01',
        status: 'Reciclado',
        category: 'Monitor',
        price: 95000,
        supplier: 'Tecnologia Angola',
        brand: 'HP',
        note: 'Equipamento de demonstração',
        useFulLife: 4,
        dates: {
            purchaseDate: new Date('2023-02-05T00:00:00.000Z'),
            manufaturingDate: 2022
        },
        laboratoryTitle: 'Laboratório de Redes'
    }
]

async function seedUser(filter, data, password) {
    return User.findOneAndUpdate(
        filter,
        {
            $setOnInsert: {
                ...data,
                pwd: await bcrypt.hash(password, 10)
            }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

async function seed() {
    const mongoUri = process.env.PORT
        ? process.env.MONGO_URI_CLOUD
        : process.env.MONGO_URI_LOCAL

    if (!mongoUri) {
        throw new Error('Defina MONGO_URI_LOCAL ou MONGO_URI_CLOUD no ficheiro .env.')
    }

    if (!process.env.ADMIN_PWD || !process.env.SEED_EMPLOYEE_PWD) {
        throw new Error('Defina ADMIN_PWD e SEED_EMPLOYEE_PWD no ficheiro .env.')
    }

    await mongoose.connect(mongoUri)
    console.log('MongoDB Connected')

    const admin = await seedUser(
        { role: 'Administrador' },
        {
            name: 'Administrador do Sistema',
            tel: '923100100',
            role: 'Administrador'
        },
        process.env.ADMIN_PWD
    )
    const employee = await seedUser(
        { tel: '923200200' },
        {
            name: 'Funcionário de Demonstração',
            tel: '923200200',
            role: 'Funcionário'
        },
        process.env.SEED_EMPLOYEE_PWD
    )

    const laboratories = new Map()
    for (const data of laboratoryData) {
        const laboratory = await Laboratory.findOneAndUpdate(
            { title: data.title },
            { $setOnInsert: data },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        laboratories.set(data.title, laboratory)
    }

    const seededEquipamentIds = []
    for (const { laboratoryTitle, ...data } of equipamentData) {
        const equipament = await Equipament.findOneAndUpdate(
            { title: data.title, supplier: data.supplier },
            {
                $setOnInsert: {
                    ...data,
                    laboratory: laboratories.get(laboratoryTitle)._id,
                    employee: employee._id
                }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        seededEquipamentIds.push(equipament._id)

        const missingLinks = {}
        if (!equipament.employee) missingLinks.employee = employee._id
        if (!equipament.laboratory) {
            missingLinks.laboratory = laboratories.get(laboratoryTitle)._id
        }
        if (Object.keys(missingLinks).length > 0) {
            await Equipament.updateOne({ _id: equipament._id }, { $set: missingLinks })
        }
    }

    const seedStartedAt = new Date('2026-01-15T08:00:00.000Z')
    const existingDemoInventory = await Inventory.exists({
        employee: employee._id,
        startedAt: seedStartedAt
    })

    if (!existingDemoInventory) {
        const selectedLaboratories = [...laboratories.values()]
        const laboratoryTitles = new Map(selectedLaboratories.map(laboratory => [
            String(laboratory._id),
            laboratory.title
        ]))
        const seededEquipaments = await Equipament
            .find({
                _id: { $in: seededEquipamentIds },
                laboratory: { $in: selectedLaboratories.map(laboratory => laboratory._id) }
            })
            .sort({ title: 1 })

        const checkedInAt = new Date('2026-01-15T08:30:00.000Z')
        await new Inventory({
            laboratories: selectedLaboratories.map(laboratory => ({
                laboratory: laboratory._id,
                title: laboratory.title,
                area: laboratory.area
            })),
            employee: employee._id,
            status: 'Concluído',
            startedAt: seedStartedAt,
            completedAt: new Date('2026-01-15T09:00:00.000Z'),
            items: seededEquipaments.map((equipament, index) => {
                const checkedIn = index < seededEquipaments.length - 1
                return {
                    equipment: equipament._id,
                    title: equipament.title,
                    category: equipament.category,
                    laboratoryTitle: laboratoryTitles.get(String(equipament.laboratory)),
                    statusAtStart: equipament.status,
                    checkedIn,
                    ...(checkedIn ? {
                        statusAtCheckIn: equipament.status,
                        checkedInAt: new Date(checkedInAt.getTime() + index * 60_000)
                    } : {})
                }
            })
        }).save()
    }

    console.log(`Seeder concluído: administrador ${admin.tel}, funcionário ${employee.tel}, laboratórios, equipamentos e inventário de demonstração.`)
}

try {
    await seed()
} catch (error) {
    console.error('Falha ao executar o seeder:', error)
    process.exitCode = 1
} finally {
    await mongoose.disconnect()
}
