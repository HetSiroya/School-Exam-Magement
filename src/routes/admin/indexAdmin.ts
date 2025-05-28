import express from "express";

const router = express.Router();
import auth from "./authRoutesAdmin";
import teacher from "./adminTeacherRoutes";
import standard from "./gradeRoutes";
import result from "./adminStudentRoutes";

router.use("/auth", auth);
router.use("/standard", standard);
router.use("/teacher", teacher);
router.use("/result" , result)
export default router;
