//Bonu
import Like from "../models/like.model.js"

async function create(req,res) {
    try {
        let data= req.body
        let create = await Like.create(data)
        res.status(200).json({message:create})
    } catch (error) {
     
        res.status(400).json({message:error.message})
    }

}
async function remove(req,res) {
    try {
        let {id}= req.params
       
       await Like.destroy(id)
        res.status(200).json({message:"removed"})
    } catch (error) {
     
        res.status(400).json({message:error.message})
    }
}
export {create,remove}