import {Router} from "express";
import {createNews, getNews, getSingleNews} from "./news.controller.js";
import {authMiddleware} from "../../../middlewares/auth.middleware.js";
import {validate} from "../../../middlewares/validate.middleware.js";
import {uploadImage} from "../../../middlewares/ulpload.middleware.js";
import {createNewsSchema} from "../../../validations/news.validation.js";

const router = Router();

router.get('/', authMiddleware, getNews);
router.get('/:id', authMiddleware, getSingleNews);
router.post('/', authMiddleware, uploadImage.single("image"), validate(createNewsSchema), createNews);


export default router;


