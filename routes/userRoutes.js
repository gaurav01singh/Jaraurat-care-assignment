import express from "express";
import { registerUser, loginUser, forgotPassword } from "../controllers/userConteroller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forget-password",authenticateToken, forgotPassword);
router.get("/protected", (req, res) => {
    res.send("This is a protected route");
  });

export default router;
