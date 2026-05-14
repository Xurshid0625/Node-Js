import {Router} from "express";
import {getPosts, getSinglePost, createPost, updatePost, deletePost} from "./post.controller.js";
import {authMiddleware} from "../../../middlewares/auth.middleware.js";
import {validate} from "../../../middlewares/validate.middleware.js";
import {createPostSchema, updatePostSchema} from "../../../validations/post.validation.js";

const router = Router();

router.use(authMiddleware);

router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/', validate(createPostSchema), createPost);
router.put('/:id', validate(updatePostSchema), updatePost);
router.delete('/:id', deletePost);

export default router;