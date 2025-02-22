//Bonu
import { promises as fs}  from "fs"
import Resourse from "../models/resourse.model.js"
import User from "../models/user.model.js"
import ResourseCategory from "../models/resourseCategory.model.js"
import { resourceValidate } from "../validations/resource.validation.js"
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
        let data = await Resourse.findAndCountAll({where:where,limit:limit,offset:offset,order:order,include:[{model:User,attributes:['fullName', 'image', 'phone', 'type']},{model:ResourseCategory}]})
        res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne= await Resourse.findByPk(id,{include:[{model:User},{model:ResourseCategory}]})
        if(!findOne){
            return  res.status(404).json({message:"not found this kind of resourse"})
        }
        res.status(400).json(findOne)
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
        let {error}=resourceValidate({...data})
        if(error){
            await fs.unlink(`./uploadsResourse/${filename}`) 
            res.status(400).json({message:error.message})
        }
        data.photo= filename
        data.userId=req.user.id
        let create = await Resourse.create({...data})
        res.status(200).json({message:create})
    } catch (error) {
       
        res.status(400).json({message:error.message})
    }
}
async function update(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await Resourse.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of resourse"})
        }
        let oldimage = check.dataValues.photo;
        data.photo = req.file ? req.file.filename : oldimage;
        if (!data.photo){
            return res.status(404).json({ message: "not uploaded file" })
        }
        await Resourse.update(data,{where:{id}})
        await fs.unlink(`uploadsResourse/${oldimage}`);
        return  res.status(200).json({message:"Successfully updated"})
    } catch (error) {
        
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
        let check =await Resourse.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of resourse"})
        }
        await Resourse.destroy({where:{id:id}})
        await fs.unlink(`./uploadsResourse/${check.dataValues.photo}`) 
        return  res.status(200).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {findAll,findOne,create,update,remove}