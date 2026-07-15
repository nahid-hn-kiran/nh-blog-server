import { Post } from "../../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (
  payload: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string,
) => {
  const post = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return post;
};

const getAllPost = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};

export const postService = {
  createPost,
  getAllPost,
};
