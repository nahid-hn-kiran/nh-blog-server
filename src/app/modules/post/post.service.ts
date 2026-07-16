import { Post, PostStatus } from "../../../../generated/prisma/client";
import { PostWhereInput } from "../../../../generated/prisma/models";
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

const getAllPost = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
}: {
  search: string | undefined;
  tags: string[] | undefined;
  isFeatured: boolean;
  status: PostStatus | undefined;
  authorId: string | undefined;
}) => {
  const andConditions: PostWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ],
    });
  }

  if (tags && tags.length > 0) {
    andConditions.push({ tags: { hasEvery: tags } });
  }

  if (isFeatured) andConditions.push({ isFeatured });
  if (status) andConditions.push({ status });
  if (authorId) andConditions.push({ authorId });

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const posts = await prisma.post.findMany({
    where: whereConditions,
  });
  return posts;
};

export const postService = {
  createPost,
  getAllPost,
};
