import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ResourseCategory = sequelize.define(
    "resourseCategory",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }
)
export default ResourseCategory