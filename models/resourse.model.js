import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import ResourseCategory from "./resourseCategory.model.js";

const Resourse = sequelize.define(
    "resourse",
    {
      name:{
        type:DataTypes.STRING,
        allowNull:false
      },
      media:{
        type:DataTypes.STRING,
       
      },
      description:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      photo:{
        type:DataTypes.STRING,
        allowNull:false
      },
      userId:{
        type:DataTypes.STRING,
        references:{
          model:User,
          key:"id"
        },
        allowNull:false
      },
      resourseCategoryId:{
        type:DataTypes.INTEGER,
        references:{
          model:ResourseCategory,
          key:"id"
        },
        allowNull:false
      },
    }
)
ResourseCategory.hasMany(Resourse,{foreignKey:"resourseCategoryId"})
Resourse.belongsTo(ResourseCategory,{foreignKey:"resourseCategoryId"})
export default Resourse