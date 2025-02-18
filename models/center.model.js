import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Region from "./region.model.js";

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
        references:{
          model:Region,
          key:"id"
        },
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
Center.belongsTo(Region,{foreignKey:"regionId"})
Region.hasMany(Center,{foreignKey:"regionId"})
export default Center