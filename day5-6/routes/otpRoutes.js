import express from "express";
import { getAllOtp, sendOtp } from "../controllers/otpController.js";

const otpRoutes = express.Router();

otpRoutes.route("/").post(sendOtp).get(getAllOtp);

export default otpRoutes;
