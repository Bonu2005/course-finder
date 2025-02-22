//Bonu
import { promises as fs}  from "fs"
import ResourseCategory from "../models/resourseCategory.model.js"
import { resourseCategoryValidate } from "../validations/resourceCategory,validation.js"
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
        let data = await ResourseCategory.findAndCountAll({where:where,limit:limit,offset:offset,order:order})
        res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne= await ResourseCategory.findByPk(id)
        if(!findOne){
            return  res.status(404).json({message:"not found this kind of resourseCategory"})
        }
        res.status(200).json(findOne)
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
        let {error}= resourseCategoryValidate({...data})
        if(error){
            await fs.unlink(`./uploads/${filename}`) 
           return  res.status(400).json({message:error.message})
        }
        data.photo=filename
        let create = await ResourseCategory.create({...data})
        res.status(200).json({message:create})
    } catch (error) {
       
        res.status(400).json({message:error.message})
    }

}
async function update(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await ResourseCategory.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of resourseCategory"})
        }
        let oldimage = check.dataValues.photo;
        data.photo = req.file ? req.file.filename : oldimage;
        if (!data.photo){
            return res.status(404).json({ message: "not uploaded file" })
        }
        await ResourseCategory.update(data,{where:{id}})
        await fs.unlink(`uploadsResourse/${oldimage}`);
        return  res.status(200).json({message:"Successfully updated"})
    } catch (error) {
        
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
        let check =await ResourseCategory.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of resourseCategory"})
        }
        await ResourseCategory.destroy({where:{id:id}})
        await fs.unlink(`./uploads/${check.dataValues.photo}`) 
        return  res.status(200).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {findAll,findOne,create,update,remove}