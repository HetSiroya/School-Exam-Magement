import express from "express";

const router = express.Router();
import auth from "./authRoutesAdmin";
import teacher from "./adminTeacherRoutes";

router.use("/auth", auth);
router.use("/teacher", teacher);
export default router;
