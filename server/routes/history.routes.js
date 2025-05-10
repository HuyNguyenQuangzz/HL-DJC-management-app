const express = require('express');
const router = express.Router();
const {getAllHistory    } = require('../controllers/history.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', adminMiddleware, getAllHistory);

module.exports = router;