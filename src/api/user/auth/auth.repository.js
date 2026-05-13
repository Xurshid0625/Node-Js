import prisma from "../../../config/db.js";

export const findByUserEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const createUser = async (data) => {
    return await prisma.user.create({
        data,
    })
}