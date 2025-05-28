import mongoose from "mongoose";

interface IResult {
  examId: mongoose.Schema.Types.ObjectId;
  studentId: mongoose.Schema.Types.ObjectId;
  result: string;
  score: number;
  grade: mongoose.Schema.Types.ObjectId;
}

const resultSchema = new mongoose.Schema<IResult>({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exams",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  result: {
    type: String,
    enum: ["fail", "pass"],
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "grades",
    required: true,
  },
});

const resultModel = mongoose.model<IResult>("Result", resultSchema);
export default resultModel;
