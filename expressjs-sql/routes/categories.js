const { Router } = require('express');
const router = Router();

const {
  getAllCategories,
  getCategoryById,
  storeCategory,
  updateCategoryById,
  destroyCategoryById
} = require('../controllers/categoryController');
const { authMiddleware } = require('../middleware/userMiddleware');

router.get('/', getAllCategories);
router.get('/:id', authMiddleware, getCategoryById);
router.post('/', storeCategory);
router.put('/:id', updateCategoryById);
router.delete('/:id', destroyCategoryById);

module.exports = router;