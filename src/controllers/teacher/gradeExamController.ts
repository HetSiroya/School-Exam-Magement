import express from "express";
import { Response, Request } from "express";
import { CustomRequest } from "../../middlewares/token-decode";
import teacherModel from "../../models/teachers/teacherDetailModel";
import examModel from "../../models/teachers/examModel";
import { checkRequiredFields } from "../../helpers/commonValidator";
import gradeModel from "../../models/admin/gradeModel";
import questionModel from "../../models/teachers/questionModel";

export const setExam = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const exist = await teacherModel.findById(userId);
    if (!exist) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const { examName, subject, date, time, grade, startTime, endTime } =
      req.body;
    const requiredFields = [
      "examName",
      "subject",
      "date",
      "time",
      "grade",
      "startTime",
      "endTime",
    ];
    const validationError = checkRequiredFields(req.body, requiredFields);
    if (validationError) {
      return res.status(400).json({
        status: 400,
        message: validationError,
        data: "",
      });
    }

    const gradeExist = await gradeModel.findById(grade);
    if (!gradeExist) {
      return res.status(400).json({
        status: 400,
        message: "grade not found",
        data: "",
      });
    }

    // Validate that startTime is before endTime
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({
        status: 400,
        message: "Start time must be before end time",
        data: "",
      });
    }

    const newExam = new examModel({
      examName: examName,
      subject: subject,
      date: date,
      by: userId,
      time: time,
      grade: grade,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: "scheduled", // Default status as per model
    });
    await newExam.save();
    return res.status(200).json({
      status: 200,
      message: "Exam set successfully",
      data: newExam,
    });
  } catch (error: any) {
    console.log("Error", error.message);
    return res.status(400).json({
      status: 400,
      message: "Something went wrong",
      data: "",
    });
  }
};

export const setQuestion = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const exist = await teacherModel.findById(userId);
    if (!exist) {
      return res.status(400).json({
        status: 400,
        message: "user not found",
        data: "",
      });
    }
    const examId = req.params.examId;
    const examExist = await examModel.findById(examId);
    if (!examExist) {
      return res.status(400).json({
        status: 400,
        message: "exam not found",
        data: "",
      });
    }
    const { question, options, answer, mark } = req.body;
    const requiredFields = ["examId", "question", "options", "answer", "mark"];
    const validationError = checkRequiredFields(req.body, requiredFields);
    const newQuestion = new questionModel({
      examId: examId,
      question: question,
      options: options,
      answers: answer,
      mark: mark,
    });
    await newQuestion.save();
    return res.status(200).json({
      status: 200,
      message: "Question added successfully",
      data: newQuestion,
    });
  } catch (error: any) {
    console.log("Error", error.message);
    return res.status(400).json({
      status: 400,
      message: "Something went wrong",
      data: "",
    });
  }
};
