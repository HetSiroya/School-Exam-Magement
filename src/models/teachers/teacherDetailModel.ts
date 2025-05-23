import mongoose from "mongoose";
import { model } from "mongoose";

interface User {
  name: string;
  email: string;
  password: string;
  mobileNumber: number;
  addedBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

const User = new mongoose.Schema<User>(
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
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const teacherModel = model<User>("Teacher", User);
export default teacherModel;
