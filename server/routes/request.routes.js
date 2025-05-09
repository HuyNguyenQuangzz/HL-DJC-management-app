const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request.controller");

// Định nghĩa các endpoint
router.get("/", requestController.getAllRequests);
router.post("/", requestController.createRequest);
router.patch("/:id", requestController.updateRequest);
router.delete("/:id", requestController.deleteRequest);

module.exports = router;
