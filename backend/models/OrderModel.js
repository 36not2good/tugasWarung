import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Order = db.define('order',{
    nama_menu: DataTypes.STRING,
    jumlah_pesanan: DataTypes.INTEGER,
    harga_satuan: DataTypes.INTEGER,
    catatan: DataTypes.STRING,
    keterangan: DataTypes.INTEGER,
    foto_menu: DataTypes.STRING,
},{
    freezeTableName:true
});

export default Order