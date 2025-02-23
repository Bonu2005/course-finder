//Bonu
import { promises as fs } from "fs"
import Majority from "../models/majority.model.js"
import Subject from "../models/subject.model.js"
import { majorityValidate } from "../validations/majority.validation.js"
import Like from "../models/like.model.js"
import Filial from "../models/filial.model.js"
import MajorityItem from "../models/majorutyItem.model.js"
import Center from "../models/center.model.js"
import Region from "../models/region.model.js"
import { Op } from "sequelize"

// import path from 'path'
// import fs from "fs"
async function findAll(req, res) {
    try {
        const { page = 1, pageSize = 10, sortBy, sortOrder = "ASC", ...filter } = req.query
        const limit = parseInt(pageSize)
        const offset = (page - 1) * limit
        const order = []
        if (sortBy) {
            order.push([sortBy, sortOrder])
        }
        const where = {}
        Object.keys(filter).forEach((key) => { where[key] = { [Op.substring]: `%${filter[key]}%` } })
        console.log(where)
        let data = await Majority.findAndCountAll({where,limit:limit,offset:offset,order:order,include:[Subject, Center],attributes:{exclude:["majorityId"]}})
        res.json({data:data.rows,totalItems:data.count,totalPages:Math.ceil(data.count / limit),currentPage:parseInt(page)})
      
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
async function findOne(req, res) {
    try {
        let { id } = req.params
        // let dat = await MajorityItem.findOne({ where: { majorityId: id }, include: [{ model: Center }, { model: Majority }] })

        // let dat1 = await Majority.findAll({ include: { model: MajorityItem } })
        // let dat2 = await Center.findAll({ include: { model: MajorityItem } })
        // console.log(dat, dat1, dat2)

        // let likes = await Like.findAll({ where: { centerId: id } })
        // let likes_count = likes.length
        // let filials = await Filial.findAll({ where: { centerId: id } })
        // let filials_count = filials.length
        // let majority = await MajorityItem.findAll({ where: { centerId: id }, include: [{ model: Majority, include: Subject }] })
        // let comment = await Comment.findAll({
        //     where: { centerId: id }, attributes: [
        //         [Sequelize.fn('AVG', Sequelize.col('star')), 'average_rating']
        //     ], group: ['centerId']
        // })
        // let averageRating = Math.ceil(comment[0].dataValues.average_rating);
        // let data = await Center.findByPk(id, { include: [{ model: User, attributes: ['id', 'fullName', 'image', 'type'] }, { model: Region, attributes: ['id', 'name'] }], attributes: ['name', 'photo', 'address', 'createdAt', 'id'] })
        // let findAll = await Center.findAll({ where: {} })
        // if (!data) {
        //     return res.status(404).json({ message: "not found this kind of center" })
        // }
        // res.status(200).json({ 'likes_count': likes_count, 'filials_count': filials_count, 'average_rating': averageRating, data, majority })

        let findOne = await Majority.findByPk(id,  { include: [{ model: Subject }]  })
        if (!findOne) {
            return res.status(404).json({ message: "not found this kind of majority" })
        }
        res.status(200).json(findOne)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function create(req, res) {
    try {
        if (!req.file) {
            return res.status(404).json({ message: "No file uploded" })
        }
        let { filename } = req.file
        console.log(filename);

        let { ...data } = req.body
        Number(data.subjectId)
        let { error } = majorityValidate({ ...data })
        if (error) {
            await fs.unlink(`uploadsMajority/${filename}`)
            res.status(400).json({ message: error.message })
        }
        let create = await Majority.create({ photo: filename, ...data })
        res.status(200).json({ message: create })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }

}
async function update(req, res) {
    try {
        let { id } = req.params
        let data = req.body
        let check = await Majority.findByPk(id)
        if (!check) {
            return res.status(404).json({ message: "not found this kind of majority" })
        }
        let oldimage = check.dataValues.photo;
        console.log(oldimage);
        
        data.photo = req.file ? req.file.filename : oldimage;
        if (!data.photo){
            return res.status(404).json({ message: "not uploaded file" })
        }
        await Majority.update(data, { where: { id } })
        await fs.unlink(`uploadsMajority/${oldimage}`); 
        return res.status(200).json({ message: "Successfully updated" })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }

}
async function remove(req, res) {
    try {
        let { id } = req.params

        let check = await Majority.findByPk(id)
        if (!check) {
            return res.status(404).json({ message: "not found this kind of majority" })
        }
        await Majority.destroy({ where: { id: id } })
        await fs.unlink(`uploadsMajority/${check.dataValues.photo}`)
        return res.status(200).json({ message: "Successfully removed" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
export { findAll, findOne, create, update, remove }