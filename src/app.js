import express from 'express';
import cors from 'cors';

import authRoute from "./api/user/auth/auth.route.js";
import postRoutes from "./api/user/post/post.routes.js";
import {errorMiddleware} from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoutes);

app.use(errorMiddleware);
export default app;