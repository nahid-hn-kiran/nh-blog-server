import { Router } from "express";
import { postRoutes } from "../modules/post/post.route";

const router = Router();

router.use("/post", postRoutes);

export const IndexRoutes = router;
