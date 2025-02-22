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
        type:DataTypes.ENUM("CEO","STUDENT","NOTYPE"),
        
      },
      role:{
        type:DataTypes.ENUM("ADMIN", "USER"),
        defaultValue:"USER",
       
      },
    },
    {tableName:"user"}
)
export default User;