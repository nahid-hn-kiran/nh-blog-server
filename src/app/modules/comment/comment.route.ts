import express from "express";
import { commentController } from "./comment.controller";
import authGuard, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.get("/author/:authorId", commentController.getCommentsByAuthor);

router.get("/:commentId", commentController.getCommentById);

router.post(
  "/",
  authGuard(UserRole.USER, UserRole.ADMIN),
  commentController.createComment,
);

router.delete(
  "/:commentId",
  authGuard(UserRole.USER, UserRole.ADMIN),
  commentController.deleteComment,
);

router.patch(
  "/:commentId",
  authGuard(UserRole.USER, UserRole.ADMIN),
  commentController.updateComment,
);

router.patch(
  "/:commentId/moderate",
  authGuard(UserRole.ADMIN),
  commentController.moderateComment,
);

export const commentRoutes = router;
