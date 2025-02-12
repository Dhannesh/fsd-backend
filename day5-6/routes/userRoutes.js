import express from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.route("/").get(getUsers);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);

export default userRoutes;
