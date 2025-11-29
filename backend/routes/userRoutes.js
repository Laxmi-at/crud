import express from "express";
import {
  allUsers,
  deleteUser,
  login,
  register,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", allUsers);
router.delete("/:id", deleteUser);

export default router;
