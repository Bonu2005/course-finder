//Bonu
import Center from "../models/center.model.js"
import { promises as fs}  from "fs"
import Region from "../models/region.model.js"
import Filial from "../models/filial.model.js"
async function findAll(req,res) {
    try {
        
        let data = await Filial.findAll({include:[{model:Region},{model:Center}]})
        res.send(data)
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
        let create = await Filial.create({photo:filename,...data})
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
        let data= req.body
        let check =await Filial.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Filial.destroy(data,{where:{id}})
        await fs.unlink(`./uploads/${check.dataValues.photo}`) 
        return  res.status(204).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {findAll,findOne,create,update,remove}