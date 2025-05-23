import express from "express";
import { auth } from "../../middlewares/token-decode";
import {
  addStudent,
  deleteStudent,
  editStudent,
  getAllStudent,
} from "../../controllers/teacher/teacherStudentController";
const router = express.Router();

router.post("/addStudent", auth, async (req, res, next) => {
  try {
    await addStudent(req, res);
  } catch (error) {
    next(error);
  }
});
router.patch("/editStudent/:id", auth, async (req, res, next) => {
  try {
    await editStudent(req, res);
  } catch (error) {
    next(error);
  }
});
router.get("/getAllStudent", auth, async (req, res, next) => {
  try {
    await getAllStudent(req, res);
  } catch (error) {
    next(error);
  }
});
router.delete("/deleteStudent/:id", auth, async (req, res, next) => {
  try {
    await deleteStudent(req, res);
  } catch (error) {
    next(error);
  }
});
export default router;
