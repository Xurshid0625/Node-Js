import {registerService, loginService} from './auth.service.js';
import {asyncHandler} from "../../../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {

    const result = await registerService(req.body);

    res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
    const result = await loginService(req.body);

    res.status(200).json(result);
});

export const getMe = async (req, res) => {
    res.json({
        message: "Protected route", user: req.user
    });
};