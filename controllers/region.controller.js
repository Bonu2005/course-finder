//Bonu
import Center from "../models/center.model.js"
import Region from "../models/region.model.js"
import { regionValidate } from "../validations/region.validation.js"
import { Op } from "sequelize"
async function findAll(req,res) {
    try {
        const {page =1,pageSize=10,sortBy,sortOrder="ASC",...filter}=req.query
        const limit = parseInt(pageSize)
        const offset = (page-1)*limit
        const order = []
        if(sortBy){
            order.push([sortBy,sortOrder])
        }
        const where= {}
                Object.keys(filter).forEach((key)=>{where[key]={[Op.like]:`%${filter[key]}%`}})
        let data = await Region.findAndCountAll({where:where,limit:limit,offset:offset,order:order})
        res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne= await Region.findByPk(id)
        if(!findOne){
            return  res.status(404).json({message:"not found this kind of region"})
        }
        res.status(400).json(findOne)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function create(req,res) {
    try {
     
        let {...data}= req.body
        let {error}=regionValidate({...data})
        if(error){
         res.status(400).json({message:error.message})  
        }
        let create = await Region.create({...data})
        res.status(200).json({message:create})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function update(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await Region.findOne({where:{id:id}})
        if(!check){
            return  res.status(404).json({message:"not found this kind of region"})
        }
       await Region.update(data,{where:{id}})
        return  res.status(200).json({message:"Successfully updated"})
    } catch (error) {
        
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
 
        let check =await Region.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of region"})
        }
        await Region.destroy({where:{id:id}})
        
        return  res.status(200).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export {findAll,findOne,create,update,remove}