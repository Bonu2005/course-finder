//Bonu
import SigninCourse from "../models/signinCourse.model.js"

async function create(req,res) {
    try {
        let {...data}= req.body
        let create = await SigninCourse.create({...data})
        res.status(200).json({message:create})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
async function remove(req,res) {
    try {
        let {id}= req.params
        let data= req.body
        let check =await SigninCourse.findByPk(id)
        if(!check){
            return  res.status(404).json({message:"not found this kind of center"})
        }
        await SigninCourse.destroy(data,{where:{id}})
        return  res.status(204).json({message:"Successfully removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {create,remove}