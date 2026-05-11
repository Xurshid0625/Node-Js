import express from 'express';
import cors from 'cors';

import authRoute from "./api/user/auth/auth.route.js";
import postRoutes from "./api/user/post/post.routes.js";
import {errorMiddleware} from "./middlewares/error.middleware.js";
import newsRoutes from "./api/user/news/news.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoutes);
app.use('/api/news', newsRoutes);

app.use(errorMiddleware);
export default app;