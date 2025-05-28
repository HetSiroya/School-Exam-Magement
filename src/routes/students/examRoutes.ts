import express, { Request, Response, NextFunction } from "express";
import { auth } from "../../middlewares/token-decode";
import {
  getAllExam,
  getExamById,
  getExamQuestion,
  submitAnswer,
  submitExam,
} from "../../controllers/student/examController";
import { nextTick } from "process";

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

router.get("/submitExam/:examId", auth, async (req, res, next) => {
  try {
    await submitExam(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/getResult' , auth , async(req , res , next) =>{
  try {
    
  } catch (error) {
    next()
  }
})


export default router;
