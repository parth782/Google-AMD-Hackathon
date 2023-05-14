const { DataTypes } = require("sequelize");
const { conn } = require('../db');
const Farmer=require('./Farmer');
const Inventory = conn.define("Inventory", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.BIGINT,
    },
    pricePerUnit: {
        type: DataTypes.BIGINT,
    },
    unit: {
        type: DataTypes.BIGINT,
    },
    farmerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        refernces: {
            model: "Farmer",
            key: "id"
        }
    },
    isDeleted:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    imgFile:{
        type:DataTypes.STRING,
        allowNull:true
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true
    }

}, { timestamps: true, tableName: "inventories" });
Inventory.belongsTo(Farmer, { foreignKey: "farmerId" });
module.exports = Inventory;