//Bonu
import Like from "../models/like.model.js"

async function create(req, res) {
    try {
        let data = req.body;
        let userId = req.user.id;
        let centerId = data.centerId; 
        let find = await Like.findOne({ where: { userId, centerId } });
        if (find) {
            return res.status(400).json({ message: "You can like a center only once." });
        }
        let create = await Like.create({ ...data, userId });
        res.status(200).json({ message: "Liked successfully", like: create });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function remove(req,res) {
    try {
        let {id}= req.params
        let like = await Like.findOne({where:{id:id}})
        if(!like){
            return res.status(400).json({ message: "You can unlike a center only once." });
        }
        await Like.destroy({where:{id:id}})
        res.status(200).json({message:"removed"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export {create,remove}