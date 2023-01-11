import categoryServices from "../services/category/categoryServices";
import apiUtils from '../utils/apiUtils';

const getCategories = async (req, res) => {
    try {
        if (req.query && req.query.page) {
            let page = +req.query.page;
            let limit = +req.query.limit;
            let data = await categoryServices.getCategoriesWithPagination(page, limit, +req.query?.delay);
            if (data.EC === 0 || data.EC === 1) {
                return res.status(200).json({
                    EC: data.EC,
                    EM: data.EM,
                    DT: data.DT
                })
            }

            return res.status(500).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        } else {
            let data = await categoryServices.getAllCategories();
            if (data.EC === 0 || data.EC === 1) {
                return res.status(200).json({
                    EC: data.EC,
                    EM: data.EM,
                    DT: data.DT
                })
            }

            return res.status(500).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json(apiUtils.resFormat());
    }


}

const upsertCategory = async (req, res) => {
    try {
        let data = await categoryServices.upsertCategory(req.body);
        if (data.EC === 0 || data.EC === 1) {
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        }

        return res.status(500).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(apiUtils.resFormat());
    }
}

const deleteACategory = async (req, res) => {
    try {
        let data = await categoryServices.deleteACategory(req.body);
        if (data.EC === 0 || data.EC === 1) {
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        }

        return res.status(500).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(apiUtils.resFormat());
    }
}



export default {
    getCategories, upsertCategory, deleteACategory
}