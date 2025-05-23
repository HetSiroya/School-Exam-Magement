import mongoose from "mongoose";
import { model } from "mongoose";

interface igrade {
  grade: string;
  addedBy: mongoose.Types.ObjectId;
}
const gradeSchema = new mongoose.Schema<igrade>(
  {
    grade: {
      type: String,
      required: true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const gradeModel = model<igrade>("grade", gradeSchema);
export default gradeModel;
