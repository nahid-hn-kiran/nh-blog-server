import { Router } from "express";
import { postRoutes } from "../modules/post/post.route";
import { commentRoutes } from "../modules/comment/comment.route";

const router = Router();

router.use("/post", postRoutes);
router.use("/comments", commentRoutes);

export const IndexRoutes = router;
