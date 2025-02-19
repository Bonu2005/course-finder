import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Region from "./region.model.js";
import User from "./user.model.js";

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
      userId:{
        type:DataTypes.INTEGER,
        references:{
          model:User,
          key:"id"
        },
        allowNull:false
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
Center.belongsTo(User,{foreignKey:"userId"})
User.hasMany(Center,{foreignKey:"userId"})
Center.belongsTo(Region,{foreignKey:"regionId"})
Region.hasMany(Center,{foreignKey:"regionId"})
export default Center