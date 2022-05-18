import { Router } from 'express';

import {createComment, getAllComments, getOneComment, deleteOneComment, updateOneComment} from '../controllers/commentsController.js';
const router = new Router();

router.post("/comments", createComment);
router.get("/comments", getAllComments);
router.get("/comments/:id", getOneComment);
router.delete("/comments/:id", deleteOneComment);
router.put("/comments/:id", updateOneComment);

export default router;