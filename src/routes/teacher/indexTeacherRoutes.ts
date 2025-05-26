import express from "express";
const router = express.Router();
import auth from "./authTeacherRoutes";
import student from "./teacherStudentRoutes";
import exam from "./examRoutes";

router.use("/auth", auth);
router.use("/student", student);
router.use("/exam" , exam)

export default router;
