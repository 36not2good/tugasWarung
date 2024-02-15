import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Role = db.define('role',{
    role: DataTypes.STRING
})

export default Role