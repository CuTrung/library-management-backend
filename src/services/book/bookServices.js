import db from "../../models";
import apiUtils from '../../utils/apiUtils';
import passwordUtils from "../../utils/passwordUtils";
import { Op } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const getAllBooks = async () => {
    try {
        let dataBooks = await db.Book.findAll({
            attributes: [
                'id', 'name', 'price',
                'borrowed', 'quantity',
            ],
            include: [
                {
                    model: db.Status,
                    attributes: ['id', 'name'],
                },
                {
                    model: db.Category,
                    attributes: ['id', 'name', 'isBorrowed'],
                    through: { attributes: [] }
                },
            ],
            raw: true,
            nest: true
        })


        // Merge key which object similar
        let data = [];
        dataBooks.forEach(book => {
            book = { ...book, Categories: [book.Categories] }

            let match = data.find(r => r.id === book.id);
            if (match) {
                match.Categories = match.Categories.concat(book.Categories);
            } else {
                data.push(book);
            }
        });

        if (data.length > 0)
            return apiUtils.resFormat(0, "Get all books successful !", data);

        return apiUtils.resFormat(1, "Get all books failed !", data);
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}

const getBookByEmail = async (email) => {
    try {
        let data = await db.Book.findOne({
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
            return apiUtils.resFormat(0, "Get book by email successful !", data);

        return apiUtils.resFormat(1, "Not found book by email !");
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}

const getBookById = async (id) => {
    try {
        let data = await db.Book.findOne({
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
            return apiUtils.resFormat(0, "Get book by id successful !", data);

        return apiUtils.resFormat(1, "Not found book by id !");
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}

const getBooksWithPagination = async (page, limit, time) => {
    try {
        let offset = (page - 1) * limit;
        let { count, rows } = await db.Book.findAndCountAll({
            attributes: [
                'id', 'name', 'price',
                'borrowed', 'quantity',
            ],
            include: [
                {
                    model: db.Status,
                    attributes: ['id', 'name'],
                },
                {
                    model: db.Category,
                    attributes: ['id', 'name', 'isBorrowed'],
                    through: { attributes: [] }
                },
            ],

            limit: limit,
            offset: offset,
            raw: true,
            nest: true
        })

        let result = [];
        rows.forEach(book => {
            book = { ...book, Categories: [book.Categories] }

            let match = result.find(r => r.id === book.id);
            if (match) {
                match.Categories = match.Categories.concat(book.Categories);
            } else {
                result.push(book);
            }
        });

        rows = result;

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            books: rows
        }

        if (time)
            await apiUtils.delay(time);

        if (rows.length > 0)
            return apiUtils.resFormat(0, "Get books with pagination successful !", data);

        return apiUtils.resFormat(1, "Get books with pagination failed !", data);
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}

const upsertBook = async (book) => {
    try {
        let categoryIds = book.categoryIds;
        delete book["categoryIds"]
        let data;
        if (!book.id)
            data = await db.Book.create({
                ...book
            })
        else
            data = await db.Book.update({
                ...book,
            }, {
                where: { id: book.id }
            })

        let bookId = book.id ? book.id : data.get({ plain: true }).id;
        let listBook_Category = categoryIds.map((categoryId) => ({ bookId, categoryId }));

        if (book.id) {
            await db.Book_Category.destroy({
                where: {
                    bookId
                }
            })
        }

        await db.Book_Category.bulkCreate(listBook_Category);

        return apiUtils.resFormat(0, `${book.id ? 'Update a' : 'Create a new'} book successful !`);
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }

}

const deleteABook = async (id) => {
    try {
        await db.Book.destroy({
            where: {
                ...id
            }
        })

        return apiUtils.resFormat(0, "Delete a book successful !");
    } catch (error) {
        console.log(error);
        return apiUtils.resFormat();
    }
}






export default {
    getAllBooks, upsertBook, deleteABook,
    getBooksWithPagination, getBookByEmail, getBookById,

}