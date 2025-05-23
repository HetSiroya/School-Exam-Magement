import express from "express";
const router = express.Router();
import admin from "./admin/indexAdmin";
// import user from "`";
// import hoster from "./Hoster/indexHoster";
router.get("/", (req, res) => {
  res.send("done");
});

// router.use("/Admin", admin);
router.use("/Admin", admin);
// router.use("/Hoster", hoster);

export default router;
