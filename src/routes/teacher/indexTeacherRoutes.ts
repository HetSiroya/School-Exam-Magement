import express from "express";
const router = express.Router();
import auth from "./authTeacherRoutes";
import student from "./teacherStudentRoutes";

router.use("/auth", auth);
router.use("/student", student);

export default router;
