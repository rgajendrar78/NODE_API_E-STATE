import express from "express";
import {
  deleteUserByID,
  getCurrentUser,
  getUserByID,
  getUsers,
  signIn,
  signUp,
  updateUserByID,
} from "../controllers/userController.js";
import { roleAuthorize } from "../middlewares/roleAuthorize.js";
import { verifyToken } from "../middlewares/varifyToken.js";
import { validateUpdateRequestBody } from "../middlewares/validateRequestBody.js";
const router = express.Router();

// User authentication routes
router.post("/api/v1/auth/signUp", signUp);
router.post("/api/v1/auth/signIn", signIn);
router.get("/api/v1/user/current", verifyToken, getCurrentUser);

// Routes accessible only by moderator
router.get("/api/v1/users", verifyToken, roleAuthorize("moderator"), getUsers);
router.get(
  "/api/v1/user/:id",
  verifyToken,
  roleAuthorize("moderator"),
  getUserByID
);
router.delete(
  "/api/v1/user/:id",
  verifyToken,
  roleAuthorize("moderator"),
  deleteUserByID
);
router.put(
  "/api/v1/user/:id",
  validateUpdateRequestBody,
  verifyToken,
  roleAuthorize("moderator"),
  updateUserByID
);

export default router;
