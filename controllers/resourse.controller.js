//Bonu
import { promises as fs}  from "fs"
import Resourse from "../models/resourse.model.js"
import User from "../models/user.model.js"
import ResourseCategory from "../models/resourseCategory.model.js"
async function findAll(req,res) {
    try {
        
        let data = await Resourse.findAll({include:[{model:User},{model:ResourseCategory}]})
        res.send(data)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne= await Resourse.findByPk(id,{include:[{model:User},{model:ResourseCategory}]})
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
        // if(!req.file){
        //   return  res.status(404).json({message:"No file uploded"})
        // }
        // let {filename}= req.file
        let {...data}= req.body
        let create = await Resourse.create({...data})
        res.status(200).json({message:create})
    } catch (error) {
        // await fs.unlink(`./uploads/${filename}`) 
        res.status(400).json({message:error.message})
    }

}
async function update(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await Resourse.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Resourse.update(data,{where:{id}})
        return  res.status(204).json({message:"Successfully updated"})
    } catch (error) {
        
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await Resourse.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Resourse.destroy(data,{where:{id}})
        await fs.unlink(`./uploads/${check.dataValues.photo}`) 
        return  res.status(204).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {findAll,findOne,create,update,remove}