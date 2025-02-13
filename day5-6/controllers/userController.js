import otpModel from "../models/otpModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const minutes = 10;
    const { otp, email, password } = req.body;
    // const otpDoc = await otpModel.findOne({
    //   createdAt: {
    //     $gte: Date.now() - minutes * 60 * 1000,
    //   },
    //   email,
    // });
    const otpDoc = await otpModel
      .findOne()
      .where("createdAt")
      .gte(Date.now() - minutes * 60 * 1000)
      .where("email")
      .equals(email);

    if (otpDoc) {
      const isValid = await bcrypt.compare(otp + "", otpDoc.otp);
      if (isValid) {
        const salt = await bcrypt.genSalt(14);
        const hashedPassword = await bcrypt.hash(password, salt);
        const User = await userModel.create({
          ...req.body,
          password: hashedPassword,
        });
        res.status(201).json({
          status: "success",
          message: "user registered successfully",
          User,
        });
        await otpModel.findByIdAndDelete(otpDoc._id);
      } else {
        res.status(403).json({ status: "fail", message: "Incorrect OTP!" });
      }
    } else {
      res.status(400).json({
        statusbar: "fail",
        message: "Either otp has expired or was not sent",
      });
    }
  } catch (error) {
    console.log("Error Code:", error.code);
    console.log("Error message: ", error.message);
    console.log("Error:", error);

    switch (error.code) {
      case 11000:
        res.status(400).json({ msg: "this email is already registered" });
        break;
      case undefined:
        res.status(400).json({ msg: "user validation error" });
      default:
        res.status(500).json({ msg: "Interal Server Error" });
    }
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ count: users.length, users });
    console.log(users);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password: plainPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(400)
        .json({ status: "fail", message: "email/password is invalid" });
      return;
    }
    const { _id, fname, password: hashedPassword } = user;
    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isValid) {
      res
        .status(401)
        .json({ status: "fail", message: "email/password is invalid" });
      return;
    }
    const token = jwt.sign({ _id, email, fname }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("authorization", token);
    console.log("token:", token, {
      httpOnly: true,
      samesite: "none",
      secure: true,
    });

    res.status(200).json({ status: "success" });
    return;
  } catch (error) {
    res.status(500).json({ msg: "Interal Server Error" });
    console.log("Error:", error.message);
  }
};

export const isLoggedIn = (req, res) => {
  try {
    res.status(200).json({ status: "success", data: req.userInfo });
  } catch (error) {
    console.log("Error:", error.message);
  }
};
