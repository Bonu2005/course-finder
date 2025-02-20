import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const tempModel = sequelize.define(
    "temp",
    {
      email:{
        type:DataTypes.STRING,
      }
    }
)
export default tempModel;