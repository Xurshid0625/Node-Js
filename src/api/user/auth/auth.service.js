import bcrypt from 'bcrypt';
import {AppError} from "../../../utils/error.js";
import {findByUserEmail, createUser} from "./auth.repository.js";
import {userResponse} from "./utils/auth.serializer.js";
import {generateToken} from "../../../utils/generateToken.js";

export const registerService = async (data) => {
    const {name, email, password, role} = data;

    const existingUser = await findByUserEmail(email);

    if (existingUser) {
        throw new AppError('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        name, email, password: hashedPassword, role
    });

    const token = generateToken(user);

    return {
        token, user: userResponse(user),
    };
}

export const loginService = async (data) => {
    const {email, password} = data;

    const user = await findByUserEmail(email);

    if (!user) {
        throw new AppError('User does not exist', 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken(user);

    return {
        token, user: userResponse(user),
    }
}

export const getMeService = async (user) => {
    return userResponse(user);
};