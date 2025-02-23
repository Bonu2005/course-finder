//Bonu
import Center from "../models/center.model.js"
import { promises as fs } from "fs"
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
import sequelize from "../config/db.js"
import { Op } from "sequelize"

async function findAll(req, res) {
    try {
        if (req.user.role == 'ADMIN') {
            const { page = 1, pageSize = 10, sortBy, sortOrder = 'ASC', ...filter } = req.query;
            const limit = parseInt(pageSize);
            const offset = (page - 1) * limit;

            const order = [];
            if (sortBy) {
                order.push([sortBy, sortOrder]);
            }
            const where = {};
            Object.keys(filter).forEach((key) => {
                where[key] = { [Op.like]: `%${filter[key]}%` };
            });
            let data = await Center.findAndCountAll({
                where: where,
                limit: limit,
                offset: offset,
                order: order,
                include: [
                    { model: Region },
                    {
                        model: User,
                        attributes: ['fullName', 'image', 'phone', 'type'],
                    },
                ],
            });


            const centersWithLikesCount = await sequelize.query(
                `
      SELECT
        c.id AS center_id,
        COUNT(l.id) AS likes_count
      FROM
        center c
      LEFT JOIN
        layk l ON l.centerId = c.id
      GROUP BY
        c.id
      `,
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            )
            const likesMap = centersWithLikesCount.reduce((acc, curr) => {
                acc[curr.center_id] = curr.likes_count;
                return acc;
            }, {});

            const centersWithLikes = data.rows.map((center) => {
                const centerId = center.id;
                const likesCount = likesMap[centerId] || 0;
                return { ...center.toJSON(), likes_count: likesCount };
            });
            res.json({
                data: centersWithLikes,
                totalItems: data.count,
                totalPages: Math.ceil(data.count / limit),
                currentPage: parseInt(page),
            });
        }
        else if (req.user.type == "CEO") {
            console.log(req.user.id);
            
            let find = await Center.findAll({ where: { userId: req.user.id } })
            const { page = 1, pageSize = 10, sortBy, sortOrder = 'ASC', ...filter } = req.query;
            const limit = parseInt(pageSize);
            const offset = (page - 1) * limit;

            const order = [];
            if (sortBy) {
                order.push([sortBy, sortOrder]);
            }
            const where = {};
            Object.keys(filter).forEach((key) => {
                where[key] = { [Op.like]: `%${filter[key]}%` };
            });
            let data = await Center.findAndCountAll({
                where: where,
                limit: limit,
                offset: offset,
                order: order,
                include: [
                    { model: Region },
                    {
                        model: User,
                        attributes: ['fullName', 'image', 'phone', 'type'],
                    },
                ],
            });


            const centersWithLikesCount = await sequelize.query(
                `
      SELECT
        c.id AS center_id,
        COUNT(l.id) AS likes_count
      FROM
        center c
      LEFT JOIN
        layk l ON l.centerId = c.id
      GROUP BY
        c.id
      `,
                {
                    type: Sequelize.QueryTypes.SELECT,
                }
            )
            const likesMap = centersWithLikesCount.reduce((acc, curr) => {
                acc[curr.center_id] = curr.likes_count;
                return acc;
            }, {});

            const centersWithLikes = data.rows.map((center) => {
                const centerId = center.id;
                const likesCount = likesMap[centerId] || 0;
                return { ...center.toJSON(), likes_count: likesCount };
            });
            res.json({
                data: centersWithLikes,
                totalItems: data.count,
                totalPages: Math.ceil(data.count / limit),
                currentPage: parseInt(page),
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
async function findOne(req, res) {
    try {
        let { id } = req.params
        let data = await Center.findByPk(id, { include: [{ model: User, attributes: ['id', 'fullName', 'image', 'type'] }, { model: Region, attributes: ['id', 'name'] }], attributes: ['name', 'photo', 'address', 'createdAt', 'id'] })
        if (!data) {
            return res.status(404).json({ message: "not found this kind of center" })
        }
        let likes = await Like.findAll({ where: { centerId: id } })
        let likes_count = likes.length
        let filials = await Filial.findAll({ where: { centerId: id } })
        let filials_count = filials.length
        let majority = await MajorityItem.findAll({ where: { centerId: id }, include: [{ model: Majority,attributes:{exclude:["majorityId"]}, include: Subject }] })
        let averageRating = "no comment"
        let comment = await Comment.findAll({
            where: { centerId: id }, attributes: [
                [Sequelize.fn('AVG', Sequelize.col('star')), 'average_rating']
            ], group: ['centerId']
        })
        if (comment.length) {
            averageRating = Number.parseFloat(comment[0].dataValues.average_rating);
           
        }
        res.status(200).json({ 'likes_count': likes_count, 'filials_count': filials_count, 'average_rating': averageRating, data, majority })
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
        let { majors, ...data } = req.body
        let { error } = centerValidate({ ...data })
        if (error) {
            await fs.unlink(`./uploadsCenter/${filename}`)
            return res.status(400).json({ message: error.message })
        }
        if (!majors) {
            await fs.unlink(`./uploadsCenter/${filename}`)
            return res.status(404).json({ message: "MajorId can not be empty" })
        }
        const arr = majors.split(",").map(Number)
       
        let create = await Center.create({ photo: filename, userId: req.user.id, ...data })
        await MajorityItem.bulkCreate(arr.map((oi) => ({ centerId: create.id, majorityId: oi })))
        res.status(200).json({ message: create })
    } catch (error) {
       
        res.status(400).json({ message: error.message })
    }
}
async function update(req, res) {
    try {
        let {id}=req.params
        
        let { majors, ...data } = req.body
 
        let check = await Center.findOne({ where: { id: req.params.id } })
        console.log(check);
        if (!check) {
            return res.status(404).json({ message: "not found this kind of center" })
        }
        let oldimage = check.dataValues.photo;
        data.photo = req.file ? req.file.filename : oldimage;
        if (!data.photo){
            return res.status(404).json({ message: "not uploaded file" })
        }
        await Center.update(data, { where: { id } })
        await fs.unlink(`uploadsCenter/${oldimage}`); 
        await MajorityItem.destroy({where:{centerId:id}})
        const arr = majors.split(",").map(Number)
        
        if (majors.length>0) {
            await MajorityItem.bulkCreate(arr.map((oi) => ({ centerId: check.id, majorityId: oi })))
        }
        else{
            return res.status(201).json({ message: "Majors should be empty" })
        }
        
        return res.status(201).json({ message: "Successfully updated" })
    } catch (error) {

        res.status(400).json({ message: error.message })
    }

}
async function remove(req, res) {
    try {
        let { id } = req.params
        let check = await Center.findByPk(id)
        if (!check) {
            return res.status(404).json({ message: "not found this kind of center" })
        }
        await Center.destroy({ where: { id: id } })
        await fs.unlink(`uploadsCenter/${check.dataValues.photo}`)
        return res.status(200).json({ message: "Successfully removed" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}
export { findAll, findOne, create, update, remove }