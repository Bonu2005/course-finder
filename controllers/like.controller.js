//Bonu
import Like from "../models/like.model.js"

async function create(req,res) {
    try {
        let data= req.body
        let find = await Like.findOne({where:{userId:req.user.id}})
        if(find){
          return  res.status(400).json({message:"You can liked only once"})
        }
        let create = await Like.create({data,userId:req.user.id})
        res.status(200).json({message:create})
    } catch (error) {
     
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
        await Like.destroy({where:{id:id}})
        res.status(200).json({message:"removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
export {create,remove}