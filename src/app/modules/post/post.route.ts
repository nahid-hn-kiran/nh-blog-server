import express from "express";
import { postController } from "./post.controller";
import authGuard, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.USER, UserRole.ADMIN),
  postController.createPost,
);

router.get("/", postController.getAllPost);

router.get("/stats", authGuard(UserRole.ADMIN), postController.getStats);

router.get(
  "/my-posts",
  authGuard(UserRole.USER, UserRole.ADMIN),
  postController.getMyPosts,
);

router.get("/:postId", postController.getPostById);

router.patch(
  "/:postId",
  authGuard(UserRole.USER, UserRole.ADMIN),
  postController.updatePost,
);

router.delete(
  "/:postId",
  authGuard(UserRole.USER, UserRole.ADMIN),
  postController.deletePost,
);

export const postRoutes = router;
