import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ResourseCategory = sequelize.define(
    "resourseCategory",
    {
        name: {
            type: DataTypes.STRING,
         
        },
        photo: {
            type: DataTypes.STRING,
        
        },
    },
    {tableName:"resourseCategory"}
)
export default ResourseCategory