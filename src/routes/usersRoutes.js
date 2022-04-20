import Router from "express";

import UsersController from "../controllers/usersController.js";

const router = new Router();

// router.post("/users", UsersController.createUser);
router.get("/users", UsersController.getAllUsers);
router.get("/users/:id", UsersController.getOneUser);
// router.put("/users", UsersController.updateUser);
// router.delete("/users/:id", UsersController.deleteUser);

export default router;
