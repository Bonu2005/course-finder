//Bonu
import Center from "../models/center.model.js"
import User from "../models/user.model.js"
import Comment from "../models/comment.model.js"
import { commentValidate } from "../validations/comment.validation.js"
async function findAll(req,res) { 
    try {
        if(req.user.role=="ADMIN"){ 
            const {page =1,pageSize=10,sortBy,sortOrder="ASC",...filter}=req.query
            const limit = parseInt(pageSize)
            const offset = (page-1)*limit
            const order = []
            if(sortBy){
                order.push([sortBy,sortOrder])
            }
            const where= {}
                    Object.keys(filter).forEach((key)=>{where[key]={[Op.like]:`%${filter[key]}%`}})
            let data = await Comment.findAndCountAll({where:where,limit:limit,offset:offset,order:order,include:[{model:User ,attributes: ['fullName', 'image','phone','type']},{model:Center}]})
    
         return   res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
        }
        else if(req.user.role=="USER" && req.user.type!="CEO"){
          
            const {page =1,pageSize=10,sortBy,sortOrder="ASC",...filter}=req.query
            const limit = parseInt(pageSize)
            const offset = (page-1)*limit
            const order = []
            if(sortBy){
                order.push([sortBy,sortOrder])
            }
            const where= {}
                    Object.keys(filter).forEach((key)=>{where[key]={[Op.like]:`%${filter[key]}%`}})
            let data = await Comment.findAndCountAll({where:where,where:{userId:req.user.id},limit:limit,offset:offset,order:order,include:[{model:User ,attributes: ['fullName', 'image','phone','type']},{model:Center}]})
    
           return res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
        }
        else if(req.user.role=="USER" && req.user.type=="CEO"){
            console.log("hi");
            const {page =1,pageSize=10,sortBy,sortOrder="ASC",...filter}=req.query
            const limit = parseInt(pageSize)
            const offset = (page-1)*limit
            const order = []
            if(sortBy){
                order.push([sortBy,sortOrder])
            } 
            let center = await Center.findAll({where:{userId:req.user.id}})
        
            
            if(!center.length){
             return   res.status(400).json({message:" this center dont have a comment"})
            }
          
            
            const where= {}
                    Object.keys(filter).forEach((key)=>{where[key]={[Op.like]:`%${filter[key]}%`}})
            let data = await Comment.findAndCountAll({where:where,where:{id:center[0].dataValues.id},limit:limit,offset:offset,order:order,include:[{model:User ,attributes: ['fullName', 'image','phone','type']},{model:Center}]})
    
          return  res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
        }

        
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let findOne= await Comment.findByPk(id,{include:[{model:User,attributes: ['fullName', 'image','phone','type']},{model:Center}]})
        if(!findOne){
            return  res.status(404).json({message:"not found this kind of comment"})
        }
        res.status(200).json(findOne)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function create(req,res) {
    try {
        let {...data}= req.body
        let {error}=commentValidate({...data})
        if(error){
            return res.status(400).json({message:error.message})
        }
        let create = await Comment.create({userId:req.user.id,...data})
        res.status(200).json({message:create})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function update(req,res) {
    try {
        let {id}= req.params
        console.log(id);
        
        let comment= await Comment.findOne({where:{id}})
        
        if(comment.userId==req.user.id){
            console.log(comment);
        
            let data= req.body
            let check =await Comment.findByPk(id)
            if(!check){
                return  res.status(404).json({message:"not found this kind of comments"})
            }
            await Comment.update(data,{where:{id}})
            return  res.status(200).json({message:"Successfully updated"})
        }
        else{
            return  res.status(400).json({message:"You can't update others comments"})
        }
        
    } catch (error) {
        
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
        let check =await Comment.findByPk(id)
        console.log(check);
        
        
        if(!check){
            return  res.status(404).json({message:"not found this kind of comments"})
        }
        await Comment.destroy({where:{id:id}})
        return  res.status(200).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {findAll,findOne,create,update,remove}