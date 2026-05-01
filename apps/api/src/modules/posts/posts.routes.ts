import { Router } from "express";

import { createPost, getPosts } from "./posts.controller";

export const postsRoutes = Router();

postsRoutes.get("/", getPosts);
postsRoutes.post("/", createPost);
