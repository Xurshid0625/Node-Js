import {asyncHandler} from "../../../utils/asyncHandler.js";
import {getNewsService, createNewsService, getSingleNewsService, updateNewsService,deleteNewsService} from "./news.service.js";


export const getNews = asyncHandler(async (req, res) => {
    const news = await getNewsService();

    res.status(200).json({
        success: true, data: news
    });
});

export const getSingleNews = asyncHandler(async (req, res) => {
    const news = await getSingleNewsService(req.params.id);
    res.status(200).json({
        success: true, data: news
    });
});

export const createNews = asyncHandler(async (req, res) => {
    const news = await createNewsService(req.body, req.user, req.file);
    res.status(200).json({
        success: true, data: news
    });
});

export const updateNews = asyncHandler(async (req, res) => {
    const news = await updateNewsService(req.params.id, req.body, req.user, req.file)

    res.status(200).json({
        success: true, data: news
    });
});

export const deleteNews = asyncHandler(async (req, res) => {
    const news = await deleteNewsService(req.params.id, req.user, req.file);

    res.status(200).json({
        success: true, news
    });
});