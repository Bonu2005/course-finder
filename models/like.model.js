import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Center from "./center.model.js";

const Like = sequelize.define(
    "`layk`",
    {
      userId:{
        type:DataTypes.INTEGER,
        references:{
          model:User,
          key:"id"
        },
      
      },
      centerId:{
        type:DataTypes.INTEGER,
        references:{
          model:Center,
          key:"id"
        },
      },
    },
    {tableName:"`layk`"}
)

Like.belongsTo(User,{foreignKey:"userId",onDelete:"CASCADE"})
Like.belongsTo(Center,{foreignKey:"centerId",onDelete:"CASCADE"})
Center.hasMany(Like,{foreignKey:"centerId",onDelete:"CASCADE"})
User.hasMany(Like,{foreignKey:"userId",onDelete:"CASCADE"})
export default Like