//Bonu
import Center from "../models/center.model.js"
import { promises as fs}  from "fs"
import Region from "../models/region.model.js"
import Filial from "../models/filial.model.js"
import { filialValidate } from "../validations/filial.validation.js"
import Like from "../models/like.model.js"
import MajorityItem from "../models/majorutyItem.model.js"
import Majority from "../models/majority.model.js"
import Subject from "../models/subject.model.js"
import User from "../models/user.model.js"
async function findAll(req,res) {
    try {
        const {page =1,pageSize=10,sortBy,sortOrder="ASC"}=req.query
        const limit = parseInt(pageSize)
        const offset = (page-1)*limit
        const order = []
        if(sortBy){
            order.push([sortBy,sortOrder])
        }
        const where= {}
                Object.keys(filter).forEach((key)=>{where[key]={[Op.like]:`%${filter[key]}%`}})
        let data = await Filial.findAndCountAll({where:where,limit:limit,offset:offset,order:order,include:[{model:Region},{model:Center}]})
        res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function findOne(req,res) {
    try {
        let {id}= req.params
       
        let findOne= await Filial.findByPk(id,{include:[{model:Region},{model:Center}]})
        if(!findOne){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        res.json(300).json(findOne)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function create(req,res) {
    try {
        if(!req.file){
          return  res.status(404).json({message:"No file uploded"})
        }
        let {filename}= req.file
        let {...data}= req.body
        let {error}= filialValidate({...data})
        if(error){
            await fs.unlink(`./uploads/${filename}`) 
            res.status(400).json({message:error.message})
        }
        let create = await Filial.create({...data})
        res.status(200).json({message:create})
    } catch (error) {
        await fs.unlink(`./uploads/${filename}`) 
        res.status(400).json({message:error.message})
    }

}
async function update(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await Filial.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Filial.update(data,{where:{id}})
        return  res.status(204).json({message:"Successfully updated"})
    } catch (error) {
        
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
        let check =await Filial.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Filial.destroy(id)
        await fs.unlink(`./uploads/${check.dataValues.photo}`) 
        return  res.status(204).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {findAll,findOne,create,update,remove}