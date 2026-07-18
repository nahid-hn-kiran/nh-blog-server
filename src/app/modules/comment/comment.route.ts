import express from "express";
import { commentController } from "./comment.controller";
import authGuard, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  authGuard(UserRole.USER, UserRole.ADMIN),
  commentController.createComment,
);

export const commentRoutes = router;
