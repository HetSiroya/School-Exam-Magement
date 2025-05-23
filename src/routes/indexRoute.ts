import express from "express";
const router = express.Router();
import admin from "./admin/indexAdmin";
import teacher from "./teacher/indexTeacherRoutes";
import student from "./students/indexStudentRoutes";
router.get("/", (req, res) => {
  res.send("done");
});

router.use("/Admin", admin);
router.use("/Teacher", teacher);
router.use("/Student", student);

export default router;
