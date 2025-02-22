//Bonu
import Center from "../models/center.model.js"
import Filial from "../models/filial.model.js"
import Majority from "../models/majority.model.js"
import SigninCourse from "../models/signinCourse.model.js"
import User from "../models/user.model.js"
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
        let data = await SigninCourse.findAndCountAll({where:where,limit:limit,offset:offset,order:order,include:[{model:User,attributes: ['fullName', 'image','phone','type']},{model:Majority},{model:Filial}]})
        res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function create(req,res) {
    try {
        let data= req.body
        status='panding'
        
        let create = await SigninCourse.create({status,userId:req.user.id,...data})
        console.log(create);
        
        res.status(200).json({message:create})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function finish(req,res) {
    try {
        let {id}= req.params
        let status="graduated"
        let check =await Filial.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of filial of center"})
        }
        await Filial.update(status,{where:{id}})
        return  res.status(204).json({message:"Successfully updated"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {create,finish,findAll}