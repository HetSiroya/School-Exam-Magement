import mongoose from "mongoose";
import { Response, Request } from "express";

interface IQuestion {
  by: mongoose.Types.ObjectId;
  question: string;
  options: string[];
  answer: string;
  grade: mongoose.Types.ObjectId;
}

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const questionModel = mongoose.model<IQuestion>("Question", questionSchema);
export default questionModel;
