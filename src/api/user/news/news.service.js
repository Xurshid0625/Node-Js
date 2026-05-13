import prisma from "../../../config/db.js";
import {AppError} from "../../../utils/error.js";

export const getNewsService = async () => {
    const news = await prisma.news.findMany({
        include: {
            author: {
                select: {
                    id: true, name: true, email: true
                },
            },
        }, orderBy: {
            createdAt: "desc",
        },
    });

    return news;
};

export const getSingleNewsService = async (id) => {
    const news = await prisma.news.findUnique({
        where: {id}, include: {
            author: {
                select: {
                    id: true, name: true, email: true,
                },
            },
        },
    });

    if (!news) {
        throw new AppError("News not found", 404);
    }

    return news;
};

export const createNewsService = async (data, user, file) => {
    const news = await prisma.news.create({
        data: {
            title: data.title, text: data.text,

            image: file ? `/uploads/${file.filename}` : null,

            authorId: user.id
        }
    });

    return news;
};

export const updateNewsService = async (id, data, user, file) => {
    const existingNews = await prisma.news.findUnique({
        where: {
            id: id,
        }
    });

    if (!existingNews) {
        throw new AppError("News not found", 404);
    }

    if (existingNews.authorId !== user.id) {
        throw new AppError("You don't have permission to update this service", 403);
    }

    const updateData = {
        title: data.title, text: data.text,
    };


    if (file) {
        updateData.image = `/uploads/${file.filename}`;
    }

    const updatedNews = await prisma.news.update({
        where: {id}, data: updateData
    });

    return updatedNews;
};

export const deleteNewsService = async (id, user) => {
    const existingNews = await prisma.news.findUnique({
        where: {id}
    });

    if (!existingNews) {
        throw new AppError("News not found", 404);
    }

    const isOwner = existingNews.authorId === user.id;

    if (!isOwner) {
        throw new AppError("Forbidden", 404);
    }

    await prisma.news.delete({
        where: {id}
    });

    return {
        message: "News deleted successfully",
    };
};