import express, { Response, Request, NextFunction } from "express";
import { auth } from "../../middlewares/token-decode";
import {
  liveExam,
  setExam,
  setQuestion,
} from "../../controllers/teacher/gradeExamController";
const router = express.Router();

router.post(
  "/addExam",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await setExam(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.post(  
  "/liveExam/:examId",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await liveExam(req, res);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/setQuestion/:examId",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await setQuestion(req, res);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
