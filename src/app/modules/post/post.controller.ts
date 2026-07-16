import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        error: "Unauthorized!",
      });
    }
    const result = await postService.createPost(req.body, user.id as string);
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create post",
      error,
    });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const tags = req.query.tags ? req.query.tags.toString().split(",") : [];
    const isFeatured = req.query.isFeatured === "true";
    const status = req.query.status as PostStatus | undefined;
    const authorId = req.query.authorId as string | undefined;

    const result = await postService.getAllPost({
      search,
      tags,
      isFeatured,
      status,
      authorId,
    });
    res.status(201).json({
      success: true,
      message: "Post retrived successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrive post",
      error,
    });
  }
};

export const postController = {
  createPost,
  getAllPost,
};
