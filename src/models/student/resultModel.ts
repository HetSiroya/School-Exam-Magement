import mongoose from "mongoose";

interface IResult {
  examID: mongoose.Schema.Types.ObjectId;
  studentId: mongoose.Schema.Types.ObjectId;
  result: string;
  score: number;
}

const resultSchema = new mongoose.Schema<IResult>({
  examID: {
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
});

const resultModel = mongoose.model<IResult>("Result", resultSchema);
export default resultModel;
