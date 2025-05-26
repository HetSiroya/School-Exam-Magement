import express from "express";
import { Response, Request } from "express";
import { CustomRequest } from "../../middlewares/token-decode";
import studentModel from "../../models/student/studentDetailsModel";
import examModel from "../../models/teachers/examModel";
import gradeModel from "../../models/admin/gradeModel";
import schedule from "node-schedule";
import questionModel from "../../models/teachers/questionModel";
import answerModel from "../../models/student/answeModel";

export const getAllExam = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const user = await studentModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
        data: "",
      });
    }
    const exams = await examModel.find({
      grade: user.grade,
    });
    if (!exams || exams.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No exams found for this grade",
        data: "",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Exams retrieved successfully",
      data: exams,
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

export const getExamById = async (req: CustomRequest, res: Response) => {
  try {
    const { examId } = req.params;
    const userId = req.user._id;
    const user = await studentModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
        data: "",
      });
    }
    const exam = await examModel.findById(examId);
    if (!exam) {
      return res.status(404).json({
        status: 404,
        message: "Exam not found",
        data: "",
      });
    }
    if (exam.grade.toString() !== user.grade.toString()) {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to access this exam",
        data: "",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Exam retrieved successfully",
      data: exam,
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

export const getExamQuestion = async (req: CustomRequest, res: Response) => {
  try {
    const { examId } = req.params;
    const userId = req.user._id;
    const user = await studentModel.findById(userId);
    0;
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
        data: "",
      });
    }
    const exam = await examModel.findById(examId);
    if (!exam) {
      return res.status(404).json({
        status: 404,
        message: "Exam not found",
        data: "",
      });
    }
    if (exam.grade.toString() !== user.grade.toString()) {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission to access this exam",
        data: "",
      });
    }

    // Schedule the exam
    const startTime = new Date(exam.startTime);
    const endTime = new Date(exam.endTime);

    // Check if the current time is within the exam period
    const now = new Date();
    if (now < startTime || now > endTime) {
      return res.status(403).json({
        status: 403,
        message: "Exam is not currently available",
        data: "",
      });
    }
    // fetch the question
    const questions = await questionModel.find({ examId: examId });
    if (!questions || questions.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No questions found for this exam",
        data: "",
      });
    }
    // Create a new exam attempt for the student
    return res.status(200).json({
      status: 200,
      message: "Exam started successfully",
      data: exam,
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

export const submitAnswer = async (req: CustomRequest, res: Response) => {
  try {
    let score = 0;
    const userId = req.user._id;
    const user = await studentModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
        data: "",
      });
    }
    const questionId = req.params.questionId;
    const question = await questionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({
        status: 404,
        message: "Question not found",
        data: "",
      });
    }
    // Check if the question belongs to the exam
    const exam = await examModel.findById(question.examId);
    if (!exam) {
      return res.status(404).json({
        status: 404,
        message: "Exam not found",
        data: "",
      });
    }
    // Check if the student has already answered this question
    const alreadyAnswered = await answerModel.findOne({
      examId: question.examId,
      studentId: userId,
      questionId: questionId,
    });
    if (alreadyAnswered) {
      return res.status(400).json({
        status: 400,
        message: "You have already answered this question",
        data: "",
      });
    }
    const { answer } = req.body;
    if (!answer) {
      return res.status(400).json({
        status: 400,
        message: "Answer is required",
        data: "",
      });
    }
    // Check if the answer is correct
    if (question.answer === answer) {
      score += question.mark;
    }

    const newattempt = new answerModel({
      examId: question.examId,
      studentId: userId,
      questionId: questionId,
      answer: answer,
      score: score,
    });
    await newattempt.save();
    return res.status(200).json({
      status: 200,
      message: "Answer submitted successfully",
      data: {
        questionId: questionId,
        score: score,
      },
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
