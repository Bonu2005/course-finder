import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Subject from "./subject.model.js";

const Majority = sequelize.define(
    "majority",
    {
      name:{
        type:DataTypes.STRING,
        allowNull:false
      },
      photo:{
        type:DataTypes.STRING,
        
      },
      subjectId:{
        type:DataTypes.INTEGER,
        references:{
          model:Subject,
          key:"id"
        },
        allowNull:false
      },
    },
    {tableName:"majority"}
)
Majority.belongsTo(Subject,{foreignKey:"subjectId"})
Subject.hasMany(Majority,{foreignKey:"subjectId"})
export default Majority