import express, { Request, Response, NextFunction } from "express";
import { auth } from "../../middlewares/token-decode";
import {
  getAllExam,
  getExamById,
  getExamQuestion,
  getExamResult,
  submitAnswer,
} from "../../controllers/student/examController";

const router = express.Router();

router.get("/getExam", auth, async (req, res, next) => {
  try {
    await getAllExam(req, res);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/getExam/:examId",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getExamById(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/submitAnswer/:questionId",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await submitAnswer(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/getExamQuestion/:examId", auth, async (req, res, next) => {
  try {
    await getExamQuestion(req, res);
  } catch (error) {
    next(error);
  }
});


router.get("/getExamResult/:examId", auth, async (req, res, next) => {
  try {
    await getExamResult(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
