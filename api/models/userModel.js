import mongoose from "mongoose";

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "moderator", "contributor"],
      default: "user",
    },
  },
  { timestamps: true }
);

// create model
export const userModel = mongoose.model("users", userSchema);
