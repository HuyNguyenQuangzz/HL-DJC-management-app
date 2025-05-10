const express = require('express');
const router = express.Router();
const {getAllItemTypes, createItemType, updateItemType, deleteItemType} = require('../controllers/itemType.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', getAllItemTypes);
router.post('/', adminMiddleware, createItemType);
router.patch('/:id', adminMiddleware, updateItemType);
router.delete('/:id', adminMiddleware, deleteItemType);

module.exports = router;