import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} from "../controllers/taskController.js";

const router = express.Router();

// Task Management Routes
// ✅ Specific first
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);

// ✅ Create task
router.post("/", protect, adminOnly, createTask);

// ✅ Specific routes BEFORE /:id
router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/todo", protect, updateTaskChecklist);

// ✅ Then generic ones
router.get("/", protect, getTasks);
router.get("/:id", protect, getTasksById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, adminOnly, deleteTask);

export default router;
