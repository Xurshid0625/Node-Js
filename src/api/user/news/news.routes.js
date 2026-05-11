import {Router} from "express";
import {createNews} from "./news.controller.js";
import {authMiddleware} from "../../../middlewares/auth.middleware.js";
import {validate} from "../../../middlewares/validate.middleware.js";
import {uploadImage} from "../../../middlewares/ulpload.middleware.js";
import {createNewsSchema} from "../../../validations/news.validation.js";

const router = Router();

router.post('/', authMiddleware, uploadImage.single("image"), validate(createNewsSchema), createNews);


export default router;
