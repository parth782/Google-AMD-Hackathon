const {DataTypes}=require("sequelize");
const {conn}=require('../db');
const Consumer=conn.define("Consumer",{
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
    money:{
        type:DataTypes.DOUBLE,
        defaultValue:2000
    },
    

},{timestamps:true,tableName:"consumers"});
module.exports=Consumer;