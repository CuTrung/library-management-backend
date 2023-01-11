import db from "../../models";
import apiUtils from '../../utils/apiUtils';
import passwordUtils from "../../utils/passwordUtils";
import { Op } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const getAllCategories = async () => {
    try {
        let data = await db.Category.findAll({
            attributes: [
                'id', 'name', 'isBorrowed'
            ],
            raw: true,
            nest: true
        })

        if (data.length > 0)
            return apiUtils.resFormat(0, "Get all categories successful !", data);

        return apiUtils.resFormat(1, "Get all categories failed !", data);
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}

const getCategoriesByEmail = async (email) => {
    try {
        let data = await db.Category.findOne({
            where: {
                [Op.and]: [
                    { isDeleted: 0 },
                    { email },
                ]
            },
            attributes: ['id', 'fullName', 'email', 'password', 'groupId'],
            include: [
                {
                    model: db.SchoolYear,
                    attributes: ['id', 'name', 'description'],
                },
                {
                    model: db.Major,
                    attributes: ['id', 'name', 'description'],
                }
            ],
            raw: true,
            nest: true
        })

        if (data)
            return apiUtils.resFormat(0, "Get categories by email successful !", data);

        return apiUtils.resFormat(1, "Not found categories by email !");
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}

const getCategoriesById = async (id) => {
    try {
        let data = await db.Category.findOne({
            where: {
                [Op.and]: [
                    { isDeleted: 0 },
                    { id },
                ]
            },
            attributes: ['id', 'fullName', 'email', 'password', 'groupId',],
            include: [
                {
                    model: db.SchoolYear,
                    attributes: ['id', 'name', 'description'],
                },
                {
                    model: db.Major,
                    attributes: ['id', 'name', 'description'],
                }
            ],
            raw: true,
            nest: true
        })

        if (data)
            return apiUtils.resFormat(0, "Get categories by id successful !", data);

        return apiUtils.resFormat(1, "Not found categories by id !");
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}

const getCategoriesWithPagination = async (page, limit, time) => {
    try {
        let offset = (page - 1) * limit;
        let { count, rows } = await db.Category.findAndCountAll({
            attributes: [
                'id', 'name', 'isBorrowed'
            ],

            limit: limit,
            offset: offset,
            raw: true,
            nest: true
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            categories: rows
        }

        if (time)
            await apiUtils.delay(time);

        if (rows.length > 0)
            return apiUtils.resFormat(0, "Get categories with pagination successful !", data);

        return apiUtils.resFormat(1, "Get categories with pagination failed !", data);
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}

const upsertCategory = async (category) => {
    try {
        if (!category.id)
            await db.Category.create({
                ...category
            })
        else
            await db.Category.update({
                ...category,
            }, {
                where: { id: category.id }
            })

        return apiUtils.resFormat(0, `${category.id ? 'Update a' : 'Create a new'} category successful !`);
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }

}

const deleteACategory = async (id) => {
    try {
        await db.Category.destroy({
            where: {
                ...id
            }
        })

        return apiUtils.resFormat(0, "Delete a category successful !");
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}





export default {
    getAllCategories, upsertCategory, deleteACategory,
    getCategoriesWithPagination, getCategoriesByEmail, getCategoriesById,

}