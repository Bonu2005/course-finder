import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Center from "./center.model.js";

const Like = sequelize.define(
    "like",
    {
      
      userId:{
        type:DataTypes.INTEGER,
        references:{
          model:User,
          key:"id"
        },
        allowNull:false
      },
      centerId:{
        type:DataTypes.INTEGER,
        references:{
          model:Center,
          key:"id"
        },
        allowNull:false
      },
    }
)

Center.belongsToMany(User,{through:Like,foreignKey:"centerId",otherKey:"userId",onDelete:"CASCADE"})
User.belongsToMany(Center,{through:Like,foreignKey:"userId",otherKey:"centerId",onDelete:"CASCADE"})
Like.belongsTo(User,{foreignKey:"userId",onDelete:"CASCADE"})
Like.belongsTo(Center,{foreignKey:"centerId",onDelete:"CASCADE"})
Center.hasMany(Like,{foreignKey:"centerId",onDelete:"CASCADE"})
User.hasMany(Like,{foreignKey:"userId",onDelete:"CASCADE"})

export default Like