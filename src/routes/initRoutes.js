import express from 'express';
const router = express.Router();

const initRoutes = (app) => {

    router.use('/', (req, res) => {
        return res.send('Hello world');
    })

    return app.use("/", router);
}

export default initRoutes;