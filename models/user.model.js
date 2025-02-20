import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
    "user",
    {
      fullName:{
        type:DataTypes.STRING,
        allowNull:false
      },
      image:{
        type:DataTypes.STRING,
        
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      email:{
        type:DataTypes.STRING,
        allowNull:false
      },
      phone:{
        type:DataTypes.STRING,
        allowNull:false
      },
      type:{
        type:DataTypes.STRING,
        allowNull:false
      },
      role:{
        type:DataTypes.STRING,
        allowNull:false
      },
    },
    {tableName:"user"}
)
export default User