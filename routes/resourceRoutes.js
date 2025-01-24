import express from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";


const router = express.Router();

router.post(
  "/create",
  authenticateToken,
  roleMiddleware(["Admin"]),
  createResource
);
router.get("/all", authenticateToken, getAllResources);
router.get("/byId/:id", authenticateToken, getResourceById);
router.put(
  "/update/:id",
  authenticateToken,
  roleMiddleware(["Admin"]),
  updateResource
);
router.delete(
  "/delete/:id",
  authenticateToken,
  roleMiddleware(["Admin"]),
  deleteResource
);

export default router;
