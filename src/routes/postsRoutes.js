import { Router } from "express";

import {
  createPost,
  getAllPosts,
  getOnePost,
  deleteOnePost,
  updateOnePost,
} from "../controllers/postsController.js";

const router = new Router();
router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getOnePost);
router.delete("/posts/:id", deleteOnePost);
router.put("/posts/:id", updateOnePost);
export default router;
