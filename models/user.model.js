import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
    "user",
    {
      fullName:{
        type:DataTypes.STRING,
       
      },
      image:{
        type:DataTypes.STRING,
        
      },
      email:{
        type:DataTypes.STRING,
        
      },
      password:{
        type:DataTypes.STRING,
        
      },
      phone:{
        type:DataTypes.STRING,
       
      },
      type:{
        type:DataTypes.ENUM("ceo","student","notype"),
        
      },
      role:{
        type:DataTypes.ENUM("admin", "user"),
        defaultValue:"user",
       
      },
    },
    {tableName:"user"}
)
export default User;