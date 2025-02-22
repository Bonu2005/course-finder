import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Center from "./center.model.js";

const Comment = sequelize.define(
    "comment",
    {
      msg_text:{
        type:DataTypes.STRING,
        
      },
      userId:{
        type:DataTypes.INTEGER,
        references:{
        model:User,
        key:"id"
        },
        
      },
      star:{
        type:DataTypes.INTEGER,
     
      },
      centerId:{
        type:DataTypes.INTEGER,
        references:{
         model:Center,
         key:"id"
        },
       
      },
    },
    {tableName:"comment"}
)
User.hasMany(Comment,{foreignKey:"userId"})
Comment.belongsTo(User,{foreignKey:"userId"})
Center.hasMany(Comment,{foreignKey:"centerId"})
Comment.belongsTo(Center,{foreignKey:"centerId"})
export default Comment