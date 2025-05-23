import express from "express";

const router = express.Router();

import {
  addTeacher,
  deleteTeacher,
  editTeacher,
  getAllTeacher,
} from "../../controllers/admin/adminTeacherController";
import { auth } from "../../middlewares/token-decode";

router.post("/addTeacher", auth, async (req, res, next) => {
  try {
    await addTeacher(req, res);
  } catch (error) {
    next(error);
  }
});

router.patch("/editTeacher/:id", auth, async (req, res, next) => {
  try {
    await editTeacher(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/getAllTeacher", async (req, res, next) => {
  try {
    await getAllTeacher(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteTeacher/:id", auth, async (req, res, next) => {
  try {
    await deleteTeacher(req, res);
  } catch (error) {
    next(error);
  }
});
export default router;
