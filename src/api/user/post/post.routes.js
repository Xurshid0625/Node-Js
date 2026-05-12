import {Router} from "express";
import {getPosts, getSinglePost, createPost, updatePost, deletePost} from "./post.controller.js";
import {authMiddleware} from "../../../middlewares/auth.middleware.js";
import {validate} from "../../../middlewares/validate.middleware.js";
import {createPostSchema, updatePostSchema} from "../../../validations/post.validation.js";

const router = Router();

router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getSinglePost);
router.post('/', authMiddleware, validate(createPostSchema), createPost);
router.put('/:id', authMiddleware, validate(updatePostSchema), updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;