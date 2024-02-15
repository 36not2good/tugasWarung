import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('user',{
    nama: DataTypes.STRING,
    no_hp: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    id_role: DataTypes.INTEGER,
    refresh_token:DataTypes.TEXT
},{
    freezeTableName:true
});

export default User;