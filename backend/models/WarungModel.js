import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Warung = db.define('warung',{
    nama_warung: DataTypes.STRING,
    id_owner: DataTypes.INTEGER,
    foto_warung: DataTypes.STRING,
    url: DataTypes.STRING, 
})

export default Warung