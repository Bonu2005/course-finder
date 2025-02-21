import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subject = sequelize.define(
    "subject",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
           
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {tableName:"subject"}
)
export default Subject