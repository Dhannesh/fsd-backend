import express from "express";
import {
  getUsers,
  loginUser,
  registerUser,
  isLoggedIn,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.route("/").get(getUsers);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/isloggedin").get(authMiddleware, isLoggedIn);

export default userRoutes;
