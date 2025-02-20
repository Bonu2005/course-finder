//Bonu
import Center from "../models/center.model.js"
import { promises as fs}  from "fs"
import Region from "../models/region.model.js"
import User from "../models/user.model.js"
import Like from "../models/like.model.js"
import { Sequelize } from "sequelize"
import Filial from "../models/filial.model.js"
import Comment from "../models/comment.model.js"
import MajorityItem from "../models/majorutyItem.model.js"
import { centerValidate } from "../validations/center.validation.js"
import Majority from "../models/majority.model.js"
import Subject from "../models/subject.model.js"
import { log } from "console"
async function findAll(req,res) {
    try {
     console.log(req.data);
     
        const {page =1,pageSize=10,sortBy,sortOrder="ASC",...filter}=req.query
        const limit = parseInt(pageSize)
        const offset = (page-1)*limit
        const order = []
        if(sortBy){
            order.push([sortBy,sortOrder])
        }
        const where= {}
                Object.keys(filter).forEach((key)=>{where[key]={[Op.like]:`%${filter[key]}%`}})
        let data = await Center.findAndCountAll({where:where,limit:limit,offset:offset,order:order,include:[{model:Region},{model:User}]})
        res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function findOne(req,res) {
    try {
        let {id}= req.params
        let likes = await Like.findAll({where:{centerId:id}})
        let likes_count=likes.length
        let filials=await Filial.findAll({where:{centerId:id}})
        let filials_count=filials.length
        let majority=await MajorityItem.findAll({where:{centerId:id},include:[{model:Majority,include:Subject}]})
        let comment = await Comment.findAll({where:{centerId:id}, attributes:[
            [Sequelize.fn('AVG', Sequelize.col('star')), 'average_rating']
        ] , group: ['centerId']})
        let averageRating = Math.ceil(comment[0].dataValues.average_rating);
        let data= await Center.findByPk(id,{include:[{model:User,attributes:['id','fullName','image','type']},{model:Region,attributes:['id','name']}],attributes:['name','photo','address','createdAt','id']})
        if(!data){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        res.status(200).json({'likes_count':likes_count,'filials_count':filials_count,'average_rating':averageRating,data,majority})
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
        let {majors,...data}= req.body
        let {error}=centerValidate({...data})
        if(error){
            // await fs.unlink(`./uploads/${filename}`) 
            return  res.status(400).json({message:error.message})
        }
        if(!majors){
            // await fs.unlink(`./uploads/${filename}`) 
            return  res.status(404).json({message:"MajorId can not be empty"})
        }
        let create = await Center.create({...data})
        await MajorityItem.bulkCreate(majors.map((oi)=>({centerId:create.id,majorityId:oi})))
        res.status(200).json({message:create})
    } catch (error) {
        // await fs.unlink(`./uploads/${filename}`) 
        res.status(400).json({message:error.message})
    }

}
async function update(req,res) {
    try {
        let {id}= req.params
        let {majors,...data}= req.body
        let check =await Center.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Center.update(data,{where:{id}})
        if(majors){
            await MajorityItem.bulkCreate(majors.map((oi)=>({centerId:check.id,majorityId:oi})))
        }
        return  res.status(201).json({message:"Successfully updated"})
    } catch (error) {
        
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
        let check =await Center.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await Center.destroy(id)
        await fs.unlink(`./uploads/${check.dataValues.photo}`) 
        return  res.status(204).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function removeMajority(req,res) {
        let {id}= req.params
        let check =await MajorityItem.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of majorityItem"})
        }
        await MajorityItem.destroy({where:{id}})
       
        return  res.status(202).json({message:"Successfully removed"})

}
export {findAll,findOne,create,update,remove,removeMajority}