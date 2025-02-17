import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Center from "./center.model.js";
import Subject from "./subject.model.js";
import Majority from "./majority.model.js";

const MajorityItem = sequelize.define(
    "majorityItem",
    {
        centerId: {
            type: DataTypes.INTEGER,
            references:{
                model:Center,
                key:"id"
            },
            allowNull: false
        },
        majorityId: {
            type: DataTypes.INTEGER,
            references:{
                model:Majority,
                key:"id"
            },
            allowNull: false
        },
    }
)
Majority.belongsToMany(Center,{through:MajorityItem,foreignKey:"majorityId",otherKey:"centerId",onDelete:"CASCADE"})
Center.belongsToMany(Majority,{through:MajorityItem,foreignKey:"centerId",otherKey:"majorityId",onDelete:"CASCADE"})
MajorityItem.belongsTo(Majority,{foreignKey:"majorityId"})
MajorityItem.belongsTo(Center,{foreignKey:"centerId"})
Center.hasMany(MajorityItem,{foreignKey:"centerId"})
Majority.hasMany(MajorityItem,{foreignKey:"majorityId"})
export default MajorityItem