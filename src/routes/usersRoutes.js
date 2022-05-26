import { Router } from "express";

import {
  createUser,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  updateOneUser,
} from "../controllers/usersController.js";

const router = new Router();
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getOneUser);
router.delete("/users/:id", deleteOneUser);
router.put("/users/:id", updateOneUser);
export default router;
