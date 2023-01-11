import bookController from "../controllers/bookController";
import categoryController from "../controllers/categoryController";
import statusController from "../controllers/statusController";



const bookRoutes = (router) => {
    router.get("/api/books", bookController.getBooks);
    router.post("/api/books", bookController.upsertBook);
    router.delete("/api/books", bookController.deleteABook);
}

const statusRoutes = (router) => {
    router.get("/api/status", statusController.getStatus);
    // router.post("/api/status", statusController.createANewStatus);
    // router.delete("/api/status", statusController.deleteAStatus);
    // router.patch("/api/status", statusController.updateAStatus);
}

const categoryRoutes = (router) => {
    router.get("/api/categories", categoryController.getCategories);
    router.post("/api/categories", categoryController.upsertCategory);
    router.delete("/api/categories", categoryController.deleteACategory);
}

export default {
    bookRoutes, statusRoutes, categoryRoutes
}