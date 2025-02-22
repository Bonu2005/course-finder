import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import ResourseCategory from "./resourseCategory.model.js";

const Resourse = sequelize.define(
    "resourse",
    {
      name:{
        type:DataTypes.STRING,
     
      },
      media:{
        type:DataTypes.STRING,
       
      },
      description:{
        type:DataTypes.STRING,
  
      },
      photo:{
        type:DataTypes.STRING,
    
      },
      userId:{
        type:DataTypes.INTEGER,
        references:{
          model:User,
          key:"id"
        },

      },
      resourseCategoryId:{
        type:DataTypes.INTEGER,
        references:{
          model:ResourseCategory,
          key:"id"
        },

      },
    },
    {tableName:"resourse"}
)
ResourseCategory.hasMany(Resourse,{foreignKey:"resourseCategoryId"})
Resourse.belongsTo(ResourseCategory,{foreignKey:"resourseCategoryId"})
Resourse.belongsTo(User,{foreignKey:"userId"})
User.hasMany(Resourse,{foreignKey:"userId"})
export default Resourse