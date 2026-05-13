import {Router} from "express";
import {createNews, deleteNews, getNews, getSingleNews, updateNews} from "./news.controller.js";
import {authMiddleware} from "../../../middlewares/auth.middleware.js";
import {validate} from "../../../middlewares/validate.middleware.js";
import {uploadImage} from "../../../middlewares/ulpload.middleware.js";
import {createNewsSchema, updateNewsSchema} from "../../../validations/news.validation.js";

const router = Router();

router.get('/', authMiddleware, getNews);
router.get('/:id', authMiddleware, getSingleNews);
router.post('/', authMiddleware, uploadImage.single("image"), validate(createNewsSchema), createNews);
router.put('/:id', authMiddleware, uploadImage.single("image"), validate(updateNewsSchema), updateNews);
router.delete('/:id', authMiddleware, deleteNews);


export default router;


