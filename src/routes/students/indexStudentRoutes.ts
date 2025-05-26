import express from "express";
const router = express.Router();
import auth from "./authStudentRoutes";
import exam from "./examRoutes";
router.use("/auth", auth);
router.use("/exam" , exam)

export default router;
