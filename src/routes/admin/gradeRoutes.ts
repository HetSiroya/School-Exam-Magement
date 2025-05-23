import {
  addGrade,
  editGrade,
  getAllGrade,
} from "../../controllers/admin/gradeController";
import { auth } from "../../middlewares/token-decode";
import express from "express";

const router = express.Router();

router.post("/addGrade", auth, async (req, res, next) => {
  try {
    await addGrade(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/getAllGrade", auth, async (req, res, next) => {
  try {
    await getAllGrade(req, res);
  } catch (error) {
    next(error);
  }
});

router.patch("/editGrade/:id", auth, async (req, res, next) => {
  try {
    await editGrade(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
