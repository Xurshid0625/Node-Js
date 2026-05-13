import jwt from "jsonwebtoken";

import prisma from "../config/db.js";

import { env } from "../config/env.js";

export const authMiddleware = async (
    req,
    res,
    next
) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token required",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        const decoded = jwt.verify(
            token,
            env.JWT_SECRET
        );

        const user =
            await prisma.user.findUnique({
                where: {
                    id: decoded.id,
                },
            });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};