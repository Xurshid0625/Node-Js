import {registerService, loginService, getMeService} from './auth.service.js';
import {asyncHandler} from "../../../utils/asyncHandler.js";
import {successResponse} from "../../../utils/successResponse.js";

export const register = asyncHandler(async (req, res) => {
    const result = await registerService(req.body);
    return successResponse(res, result, "User registered successfully", 201);
});

export const login = asyncHandler(async (req, res) => {
    const result = await loginService(req.body);
    return successResponse(res, result, "User logged in successfully", 201);
});

export const getMe = asyncHandler(async (req, res) => {
    const result = await getMeService(req.user);
    return successResponse(res, result, "Current user fetched successfully");
});