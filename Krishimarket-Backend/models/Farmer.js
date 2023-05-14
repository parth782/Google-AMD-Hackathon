const {DataTypes}=require("sequelize");
const {conn}=require('../db');
const Farmer=conn.define("Farmer",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,

    },
    mobileNo:{
        type:DataTypes.BIGINT,
        unique:true
    },
    city:{
        type:DataTypes.STRING,
    },
    district:{
        type:DataTypes.STRING,
    },
    bloodGroup:{
        type:DataTypes.ENUM(['O+','O-','A+','A-','AB-','AB+','B+','B-']),
    },
    money:{
        type:DataTypes.DOUBLE,
        defaultValue:0
    }



},{timestamps:true,tableName:"farmers"});
module.exports=Farmer;