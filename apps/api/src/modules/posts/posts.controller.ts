import type { Request, Response } from "express";

import { postsService } from "./posts.service";

type CreatePostBody = {
  title?: unknown;
  content?: unknown;
};

export async function getPosts(_req: Request, res: Response) {
  const posts = await postsService.findAll();

  res.json(posts);
}

export async function createPost(req: Request<object, object, CreatePostBody>, res: Response) {
  const { title, content } = req.body;

  if (typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "title is required" });
    return;
  }

  if (typeof content !== "string" || content.trim().length === 0) {
    res.status(400).json({ error: "content is required" });
    return;
  }

  const post = await postsService.create({
    title: title.trim(),
    content: content.trim(),
  });

  res.status(201).json(post);
}
