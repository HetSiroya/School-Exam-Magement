import express, { Request, Response, NextFunction } from "express";
import { login, signUp } from "../../controllers/admin/authControllerAdmin";
const router = express.Router();

router.post("/signUp", async (req, res, next) => {
  try {
    await signUp(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
