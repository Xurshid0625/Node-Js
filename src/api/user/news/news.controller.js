import {asyncHandler} from "../../../utils/asyncHandler.js";
import {createNewsService} from "./news.service.js";


export const createNews = asyncHandler(async (req, res) => {
    const news = await createNewsService(req.body, req.user, req.file);
    res.status(200).json({
        success: true, data: news
    });
});