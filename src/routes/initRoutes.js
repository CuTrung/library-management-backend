import express from 'express';
const router = express.Router();
import apiRoutes from './apiRoutes';

const initRoutes = (app) => {
    apiRoutes.bookRoutes(router);
    apiRoutes.statusRoutes(router);
    apiRoutes.categoryRoutes(router);

    return app.use("/", router);
}

export default initRoutes;