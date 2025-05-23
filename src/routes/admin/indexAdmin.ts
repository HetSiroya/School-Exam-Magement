import express from "express";

const router = express.Router();
import auth from "./authRoutesAdmin";
import teacher from "./adminTeacherRoutes";
import standard from "./gradeRoutes";

router.use("/auth", auth);
router.use("/standard", standard);
router.use("/teacher", teacher);
export default router;
