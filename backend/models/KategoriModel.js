import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Kategori = db.define('kategori',{
    nama_kategori: DataTypes.STRING
})

export default Kategori