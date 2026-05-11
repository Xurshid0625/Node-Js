import {asyncHandler} from "../../../utils/asyncHandler.js";
import {
    getPostService, getSinglePostService, createPostService, updatePostService, deletePostService
} from "./post.service.js";

export const getPosts = asyncHandler(async (req, res) => {
    const posts = await getPostService();
    res.status(200).json({
        success: true, data: posts
    });
});

export const getSinglePost = asyncHandler(async (req, res) => {
    const post = await getSinglePostService(req.params.id);

    res.status(200).json({
        success: true, data: post
    });
});

export const createPost = asyncHandler(async (req, res) => {
    const post = await createPostService(req.body, req.user);
    res.status(201).json({
        success: true, data: post
    });
});

export const updatePost = asyncHandler(async (req, res) => {
    const post = await updatePostService(req.params.id, req.body, req.user);

    res.status(200).json({
        success: true, data: post
    });
});

export const deletePost = asyncHandler(async (req, res) => {
    const post = await deletePostService(req.params.id, req.user);
    res.status(200).json({
        success: true, ...post
    });
});