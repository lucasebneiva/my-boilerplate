import { desc, eq } from "drizzle-orm";

import { db } from "../../db/client";
import { type NewPost, posts } from "../../db/schema";

export const postsService = {
  async findAll() {
    return db.select().from(posts).orderBy(desc(posts.createdAt));
  },

  async create(input: Pick<NewPost, "title" | "content">) {
    const [post] = await db.insert(posts).values(input).$returningId();

    if (!post) {
      throw new Error("Failed to create post");
    }

    const [createdPost] = await db.select().from(posts).where(eq(posts.id, post.id));

    if (!createdPost) {
      throw new Error("Failed to load created post");
    }

    return createdPost;
  },
};
