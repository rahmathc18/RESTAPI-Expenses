const express = require('express');
const { expenseController } = require ('../controllers/index');
const router = express.Router();

router.get('/', expenseController.fetchDetail)
router.get('/:id', expenseController.fetchList)
router.delete('/:id', expenseController.deleteExpense)
router.post('/', expenseController.addExpense)
router.patch('/:id', expenseController.editExpense)
router.get("/:category/category", expenseController.totalExpCat)

module.exports = router;