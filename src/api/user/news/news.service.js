import prisma from "../../../config/db.js";
import {AppError} from "../../../utils/error.js";

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