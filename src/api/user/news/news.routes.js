import {Router} from "express";
import {createNews, deleteNews, getNews, getSingleNews, updateNews} from "./news.controller.js";
import {authMiddleware} from "../../../middlewares/auth.middleware.js";
import {validate} from "../../../middlewares/validate.middleware.js";
import {uploadImage} from "../../../middlewares/ulpload.middleware.js";
import {createNewsSchema, updateNewsSchema} from "../../../validations/news.validation.js";
import {roleMiddleware} from "../../../middlewares/role.middleware.js";

const router = Router();

router.use(authMiddleware)

router.get('/', roleMiddleware("ADMIN"), getNews);
router.get('/:id', getSingleNews);
router.post('/', uploadImage.single("image"), validate(createNewsSchema), createNews);
router.put('/:id', uploadImage.single("image"), validate(updateNewsSchema), updateNews);
router.delete('/:id', deleteNews);


export default router;


