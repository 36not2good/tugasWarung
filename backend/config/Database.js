import { Sequelize } from "sequelize";

const db = new Sequelize ('canteen', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db;