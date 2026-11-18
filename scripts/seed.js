import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Equipament from '../models/equipament.model.js'
import Laboratory from '../models/laboratory.model.js'
import User from '../models/user.model.js'

dotenv.config()

const laboratoryData = [
    { title: 'Laboratório de Informática 1', area: 'Bloco A - 1.º andar' },
    { title: 'Laboratório de Informática 2', area: 'Bloco A - 2.º andar' },
    { title: 'Laboratório de Redes', area: 'Bloco B - 2.º andar' },
    { title: 'Laboratório de Electrónica', area: 'Bloco B - 1.º andar' },
    { title: 'Laboratório de Programação', area: 'Bloco C - Rés-do-chão' },
    { title: 'Laboratório de Multimédia', area: 'Bloco C - 1.º andar' }
]

const employeeData = [
    { name: 'Funcionário de Demonstração', tel: '923200200' },
    { name: 'Maria Domingos', tel: '923300300' },
    { name: 'João Baptista', tel: '923400400' }
]

const equipamentData = [
    {
        title: 'Computador Desktop 01',
        status: 'Bom',
        category: 'Desktop',
        price: 450000,
        supplier: 'Tecnologia Angola',
        brand: 'Dell',
        useFulLife: 5,
        dates: { purchaseDate: new Date('2024-01-15T00:00:00.000Z'), manufaturingDate: 2023 },
        laboratoryTitle: 'Laboratório de Informática 1',
        employeeTel: '923200200'
    },
    {
        title: 'Computador Desktop 02',
        status: 'Novo',
        category: 'Desktop',
        price: 480000,
        supplier: 'Tecnologia Angola',
        brand: 'HP',
        useFulLife: 5,
        dates: { purchaseDate: new Date('2025-02-12T00:00:00.000Z'), manufaturingDate: 2024 },
        laboratoryTitle: 'Laboratório de Informática 2',
        employeeTel: '923300300'
    },
    {
        title: 'Computador Desktop 03',
        status: 'Defeituoso',
        category: 'Desktop',
        price: 410000,
        supplier: 'Info Kwanza',
        brand: 'Lenovo',
        useFulLife: 5,
        dates: { purchaseDate: new Date('2022-09-08T00:00:00.000Z'), manufaturingDate: 2022 },
        laboratoryTitle: 'Laboratório de Programação',
        employeeTel: '923400400'
    },
    {
        title: 'Computador Laptop 01',
        status: 'Novo',
        category: 'Laptop',
        price: 620000,
        supplier: 'Tecnologia Angola',
        brand: 'Lenovo',
        useFulLife: 5,
        dates: { purchaseDate: new Date('2025-03-10T00:00:00.000Z'), manufaturingDate: 2025 },
        laboratoryTitle: 'Laboratório de Informática 1',
        employeeTel: '923200200'
    },
    {
        title: 'Computador Laptop 02',
        status: 'Bom',
        category: 'Laptop',
        price: 590000,
        supplier: 'Info Kwanza',
        brand: 'Dell',
        useFulLife: 5,
        dates: { purchaseDate: new Date('2024-05-22T00:00:00.000Z'), manufaturingDate: 2024 },
        laboratoryTitle: 'Laboratório de Multimédia',
        employeeTel: '923300300'
    },
    {
        title: 'Computador Laptop 03',
        status: 'Inoperante',
        category: 'Laptop',
        price: 550000,
        supplier: 'Tecnologia Angola',
        brand: 'HP',
        useFulLife: 4,
        dates: { purchaseDate: new Date('2021-11-03T00:00:00.000Z'), manufaturingDate: 2021 },
        laboratoryTitle: 'Laboratório de Electrónica',
        employeeTel: '923400400'
    },
    {
        title: 'Router de Rede 01',
        status: 'Bom',
        category: 'Router',
        price: 180000,
        supplier: 'Redes & Sistemas',
        brand: 'TP-Link',
        useFulLife: 4,
        dates: { purchaseDate: new Date('2024-06-20T00:00:00.000Z'), manufaturingDate: 2024 },
        laboratoryTitle: 'Laboratório de Redes',
        employeeTel: '923200200'
    },
    {
        title: 'Router de Rede 02',
        status: 'Novo',
        category: 'Router',
        price: 260000,
        supplier: 'Redes & Sistemas',
        brand: 'Cisco',
        useFulLife: 6,
        dates: { purchaseDate: new Date('2025-07-14T00:00:00.000Z'), manufaturingDate: 2025 },
        laboratoryTitle: 'Laboratório de Redes',
        employeeTel: '923300300'
    },
    {
        title: 'Monitor 01',
        status: 'Reciclado',
        category: 'Monitor',
        price: 95000,
        supplier: 'Tecnologia Angola',
        brand: 'HP',
        useFulLife: 4,
        dates: { purchaseDate: new Date('2023-02-05T00:00:00.000Z'), manufaturingDate: 2022 },
        laboratoryTitle: 'Laboratório de Redes',
        employeeTel: '923400400'
    },
    {
        title: 'Monitor 02',
        status: 'Bom',
        category: 'Monitor',
        price: 110000,
        supplier: 'Info Kwanza',
        brand: 'Samsung',
        useFulLife: 5,
        dates: { purchaseDate: new Date('2024-08-19T00:00:00.000Z'), manufaturingDate: 2024 },
        laboratoryTitle: 'Laboratório de Informática 2',
        employeeTel: '923200200'
    },
    {
        title: 'Monitor 03',
        status: 'Novo',
        category: 'Monitor',
        price: 130000,
        supplier: 'Tecnologia Angola',
        brand: 'LG',
        useFulLife: 5,
        dates: { purchaseDate: new Date('2025-09-01T00:00:00.000Z'), manufaturingDate: 2025 },
        laboratoryTitle: 'Laboratório de Multimédia',
        employeeTel: '923300300'
    },
    {
        title: 'Teclado 01',
        status: 'Bom',
        category: 'Teclado',
        price: 15000,
        supplier: 'Info Kwanza',
        brand: 'Logitech',
        useFulLife: 3,
        dates: { purchaseDate: new Date('2024-03-27T00:00:00.000Z'), manufaturingDate: 2024 },
        laboratoryTitle: 'Laboratório de Programação',
        employeeTel: '923400400'
    },
    {
        title: 'Teclado 02',
        status: 'Defeituoso',
        category: 'Teclado',
        price: 12000,
        supplier: 'Tecnologia Angola',
        brand: 'Microsoft',
        useFulLife: 3,
        dates: { purchaseDate: new Date('2023-04-11T00:00:00.000Z'), manufaturingDate: 2023 },
        laboratoryTitle: 'Laboratório de Informática 1',
        employeeTel: '923200200'
    },
    {
        title: 'Mouse 01',
        status: 'Novo',
        category: 'Mouse',
        price: 8000,
        supplier: 'Info Kwanza',
        brand: 'Logitech',
        useFulLife: 3,
        dates: { purchaseDate: new Date('2025-10-06T00:00:00.000Z'), manufaturingDate: 2025 },
        laboratoryTitle: 'Laboratório de Electrónica',
        employeeTel: '923300300'
    },
    {
        title: 'Mouse 02',
        status: 'Reciclado',
        category: 'Mouse',
        price: 6500,
        supplier: 'Tecnologia Angola',
        brand: 'HP',
        useFulLife: 2,
        dates: { purchaseDate: new Date('2022-12-15T00:00:00.000Z'), manufaturingDate: 2022 },
        laboratoryTitle: 'Laboratório de Programação',
        employeeTel: '923400400'
    }
].map(equipament => ({ note: 'Equipamento de demonstração', ...equipament }))

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

    const employees = new Map()
    for (const data of employeeData) {
        const employee = await seedUser(
            { tel: data.tel },
            { ...data, role: 'Funcionário' },
            process.env.SEED_EMPLOYEE_PWD
        )
        employees.set(data.tel, employee)
    }

    const laboratories = new Map()
    for (const data of laboratoryData) {
        const laboratory = await Laboratory.findOneAndUpdate(
            { title: data.title },
            { $setOnInsert: data },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        laboratories.set(data.title, laboratory)
    }

    for (const { laboratoryTitle, employeeTel, ...data } of equipamentData) {
        const laboratoryId = laboratories.get(laboratoryTitle)._id
        const employeeId = employees.get(employeeTel)._id

        const equipament = await Equipament.findOneAndUpdate(
            { title: data.title, supplier: data.supplier },
            {
                $setOnInsert: {
                    ...data,
                    laboratory: laboratoryId,
                    employee: employeeId
                }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )

        const missingLinks = {}
        if (!equipament.employee) missingLinks.employee = employeeId
        if (!equipament.laboratory) missingLinks.laboratory = laboratoryId
        if (Object.keys(missingLinks).length > 0) {
            await Equipament.updateOne({ _id: equipament._id }, { $set: missingLinks })
        }
    }

    const employeeTels = [...employees.values()].map(employee => employee.tel).join(', ')
    console.log(`Seeder concluído: administrador ${admin.tel}, funcionários ${employeeTels}, ${laboratories.size} laboratórios e ${equipamentData.length} equipamentos.`)
}

try {
    await seed()
} catch (error) {
    console.error('Falha ao executar o seeder:', error)
    process.exitCode = 1
} finally {
    await mongoose.disconnect()
}