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
}

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
}

export const createNewsService = async (data, user, file) => {
    const news = await prisma.news.create({
        data: {
            title: data.title, text: data.text,

            image: file ? `/uploads/${file.filename}` : null,

            authorId: user.id
        }
    });

    return news;
}