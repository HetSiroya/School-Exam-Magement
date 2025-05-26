import mongoose from "mongoose";
import { Response, Request } from "express";

interface IQuestion {
  examId: mongoose.Types.ObjectId;
  question: string;
  options: string[];
  answers: string[];
  mark: number;
}

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
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
    answers: {
      type: [String],
      required: true,
    },
    mark: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const questionModel = mongoose.model<IQuestion>("Question", questionSchema);
export default questionModel;
