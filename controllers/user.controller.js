import User from "../models/user.model.js"

//Rozimuhammad
async function findAll(req,res) {
    try {
        
        let data = await User.findAll()
        res.send(data)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
async function create(req,res) {
    try {
      
    
        let {...data}= req.body
        let create = await User.create({...data})
        res.status(200).json({message:create})
    } catch (error) {
        res.status(400).json({message:error.message})
    }

}
export {findAll,create}