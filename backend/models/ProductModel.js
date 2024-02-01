import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Product = db.define('product',{
    nama_menu: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    stok: DataTypes.INTEGER,
    id_kategori: DataTypes.INTEGER,
    foto: DataTypes.STRING,
    url: DataTypes.STRING, 
})

export default Product;

(async()=>{
    await db.sync();
})()