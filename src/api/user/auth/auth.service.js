import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {AppError} from "../../../utils/error.js";
import prisma from "../../../config/db.js";

export const registerService = async (data) => {
    const {
        name, email, password,
    } = data;

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{email},],
        },
    });

    if (existingUser) {
        throw new AppError('User already exists', 209);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
        data: {
            name, email, password: hashedPassword,
        },
    });

    const token = jwt.sign({
        id: user.id, email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    return {
        token, user
    };
}

export const loginService = async (data) => {
    const {email, password} = data;

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        throw new AppError('User does not exist', 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError('Invalid password', 401);
    }

    const token = jwt.sign({
        id: user.id, email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    return {
        message: 'User logged in', token, user
    }
}