import { Request, Response } from "express";
import { postService } from "./post.service";

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
    const result = await postService.getAllPost();
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
