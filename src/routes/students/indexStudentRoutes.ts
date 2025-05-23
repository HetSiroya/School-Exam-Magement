import express from "express";
const router = express.Router();
import auth from "./authStudentRoutes";

router.use("/auth", auth);

export default router;
