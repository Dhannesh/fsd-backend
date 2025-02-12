import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "please enter full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter password"],
      minLength: [6, "password length should be greter than 6"],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);
