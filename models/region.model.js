import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Region = sequelize.define(
    "region",
    {
        name: {
            type: DataTypes.STRING,
           
        },
    },
    {tableName:"region"}
)
export default Region