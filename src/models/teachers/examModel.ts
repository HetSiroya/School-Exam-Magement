import mongoose from "mongoose";
import { Response, Request } from "express";

interface IExam {
  examName: string;
  subject: string;
  date: Date;
  time: string;
  by: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  grade: mongoose.Types.ObjectId;
  totalMarks: number;
  passingMarks: number;
  remaningMarksQuestion: number;
  status: string;
}
const examSchema = new mongoose.Schema<IExam>(
  {
    examName: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    passingMarks: {
      type: Number,
      required: true,
    },
    remaningMarksQuestion: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["live", "completed" , "cancelled"],
      default: "live",
    },
  },
  {
    timestamps: true,
  }
);
const examModel = mongoose.model<IExam>("Exam", examSchema);
export default examModel;
