import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Region = sequelize.define(
    "region",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)
export default Region