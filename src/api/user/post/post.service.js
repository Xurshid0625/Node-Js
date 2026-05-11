import prisma from "../../../config/db.js";
import {AppError} from "../../../utils/error.js";

export const getPostService = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: {
                    id: true, name: true, email: true,
                },
            },
        }, orderBy: {
            createdAt: "desc",
        },
    });

    return posts;
}

export const getSinglePostService = async (id) => {
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },

        include: {
            author: {
                select: {
                    id: true, name: true, email: true
                },
            },
        },
    });

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    return post;
}

export const createPostService = async (data, user) => {
    const post = await prisma.post.create({
        data: {
            title: data.title, content: data.content,

            authorId: user.id
        },
    });

    return post;
}

export const updatePostService = async (id, data, user) => {
    const existingPost = await prisma.post.findUnique({
        where: {
            id: id,
        }
    });

    if (!existingPost) {
        throw new AppError("Post not found", 404);
    }

    if (existingPost.authorId !== user.id) {
        throw new AppError("Forbidden", 404);
    }

    const updatePost = await prisma.post.update({
        where: {id}, data
    });

    return updatePost;
}

export const deletePostService = async (id, user) => {
    const existingPost = await prisma.post.findUnique({
        where: {id},
    });

    if (!existingPost) {
        throw new AppError("Post not found", 404);
    }

    const isOwner = existingPost.authorId === user.id;

    if (!isOwner) {
        throw new AppError("Forbidden", 404);
    }

    await prisma.post.delete({
        where: {id},
    });

    return {
        message: "Post deleted successfully",
    };
};