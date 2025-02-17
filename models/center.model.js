import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Center = sequelize.define(
    "center",
    {
      name:{
        type:DataTypes.STRING,
        allowNull:false
      },
      photo:{
        type:DataTypes.STRING,
      },
      regionId:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      address:{
        type:DataTypes.STRING,
        allowNull:false
      },
      countOfFilial:{
        type:DataTypes.INTEGER
      },
      countOfLIke:{
        type:DataTypes.INTEGER
      },
    }
)
export default Center