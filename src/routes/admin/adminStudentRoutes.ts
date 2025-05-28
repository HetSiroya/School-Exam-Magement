import express from "express";
import {
  fetchSingleStudentResults,
  studentResult,
} from "../../controllers/admin/adminStudentController";
import { auth } from "../../middlewares/token-decode";
const router = express.Router();

router.get("/allResult/:grade", auth, async (req, res, next) => {
  try {
    await studentResult(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/sigleStudent/:studentId/:grade", auth, async (req, res, next) => {
  try {
    await fetchSingleStudentResults(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
