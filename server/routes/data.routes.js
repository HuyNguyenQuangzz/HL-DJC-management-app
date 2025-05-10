const express = require("express");
const router = express.Router();
const {
  getAllData,
  createData,
  updateData,
  deleteData,
} = require("../controllers/data.controller");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", getAllData);
router.post("/", createData);
router.patch("/:id", adminMiddleware, updateData);
router.delete("/:id", deleteData);

module.exports = router;
