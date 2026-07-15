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

export const postRoutes = router;
