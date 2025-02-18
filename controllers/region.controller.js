//Bonu
import Center from "../models/center.model.js"

import Region from "../models/region.model.js"
async function findAll(req,res) {
    try {
        
        let data = await Region.findAll()
        res.send(data)
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne= await Region.findByPk(id)
        if(!findOne){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        res.json(300).json(findOne)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function findByQuery(req,res) {
    try {
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function create(req,res) {
    try {
     
        let {...data}= req.body
       
        let create = await Center.create({...data})
        res.status(200).json({message:create})
    } catch (error) {
     
        res.status(400).json({message:error.message})
    }

}
async function update(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await Region.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Region.update(data,{where:{id}})
        return  res.status(204).json({message:"Successfully updated"})
    } catch (error) {
        
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await Region.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Region.destroy(data,{where:{id}})
        
        return  res.status(204).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {findAll,findOne,findByQuery,create,update,remove}