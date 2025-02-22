import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subject = sequelize.define(
    "subject",
    {
        name: {
            type: DataTypes.STRING,
    
        },
        photo: {
            type: DataTypes.STRING,
           
        },
        type: {
            type: DataTypes.STRING,
    
        },
    },
    {tableName:"subject"}
)
export default Subject