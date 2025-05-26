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

    // Check if exam is still ongoing
    const now = new Date();
    if (now < exam.startTime || now > exam.endTime) {
      return res.status(403).json({
        status: 403,
        message: "Exam time has expired",
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

    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        status: 400,
        message: "Answers must be provided as an array",
        data: "",
      });
    }

    // Calculate score based on answers
    let score = 0;
    const correctAnswers = question.answers;
    const studentAnswers = answers;

    // Check if all answers are correct
    const allCorrect = correctAnswers.every((answer) =>
      studentAnswers.includes(answer)
    );

    // Check if some answers are correct
    const someCorrect = studentAnswers.some((answer) =>
      correctAnswers.includes(answer)
    );

    if (allCorrect) {
      // All answers are correct - full marks
      score = question.mark;
    } else if (someCorrect) {
      // Some answers are correct - half marks
      score = question.mark / 2;
    }
    // If no correct answers, score remains 0

    const newattempt = new answerModel({
      examId: question.examId,
      studentId: userId,
      questionId: questionId,
      answers: answers, // Store all answers
      score: score,
    });
    await newattempt.save();
    return res.status(200).json({
      status: 200,
      message: "Answer submitted successfully",
      data: {
        questionId: questionId,
        score: score,
        totalPossibleMarks: question.mark,
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

export const getExamResult = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    let examMark = 0;
    const user = await studentModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
        data: "",
      });
    }
    const examId = req.params.examId;
    const answers = await answerModel.find({
      examId: examId,
      studentId: userId,
    });
    const question = await questionModel.find({ examId: examId });
    question.forEach((question) => {
      examMark += question.mark;
    });
    if (!answers || answers.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No answers found for this exam",
        data: "",
      });
    }
    let totalScore = 0;
    answers.forEach((answer) => {
      totalScore += answer.score;
    });
    return res.status(200).json({
      status: 200,
      message: "Exam result retrieved successfully",
      data: {
        examMark: examMark,
        examId: examId,
        totalScore: totalScore,
        answers: answers,
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
