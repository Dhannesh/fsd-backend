import otpModel from "../models/otpModel.js";
import { sendEmail } from "../utils/emailHelper.js";
import bcrypt from "bcrypt";

const genOtp = () => {
  let minm = 100000;
  let maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};

export const sendOtp = async (req, res) => {
  try {
    const otp = genOtp();
    const { email } = req.body;
    if (email && email.length > 0) {
      //TODO: check the email last sent not before 3 minutes
      const isEmailSent = await sendEmail(email, otp);
      if (isEmailSent) {
        res.status(201).json({ status: "success", message: "OTP Sent" });
        const hashedOtp = await bcrypt.hash("" + otp, 14);
        await otpModel.create({ email, otp: hashedOtp });
      } else
        res
          .status(500)
          .json({ status: "success", message: "unable to send otp" });
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ status: "success", message: "unable to send otp" });
  }
};

export const getAllOtp = async (req, res) => {
  try {
    //res.status(200).json({ msg: "aal iz well" });
    const otps = await otpModel.find();
    console.log(otps);

    res.status(200).json({ otps });
  } catch (error) {
    console.log("Error:", error.message);
  }
};
