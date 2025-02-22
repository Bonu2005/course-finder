import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Region from "./region.model.js";
import Center from "./center.model.js";

const Filial = sequelize.define(
    "filial",
    {
      location:{
        type:DataTypes.STRING,
        
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
      
      },
      phone:{
        type:DataTypes.STRING,
       
      },
      address:{
        type:DataTypes.STRING,
        
      },
      centerId:{
        type:DataTypes.INTEGER,
        references:{
         model:Center,
         key:"id"
        },
        
      },
    },
    {tableName:"filial"}
)
Region.hasMany(Filial,{foreignKey:"regionId"})
Filial.belongsTo(Region,{foreignKey:"regionId"})
Center.hasMany(Filial,{foreignKey:"centerId"})
Filial.belongsTo(Center,{foreignKey:"centerId"})
export default Filial