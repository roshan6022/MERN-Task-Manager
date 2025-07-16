import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  getUsers,
  getUserById,
  // deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// User Managemente Routes
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, getUserById);

export default router;
