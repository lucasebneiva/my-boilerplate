import express from "express";

import { postsRoutes } from "./modules/posts/posts.routes";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/posts", postsRoutes);
