import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import { login } from "../../controllers/student/authController";

router.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
