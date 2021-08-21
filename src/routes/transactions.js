const router = require('express').Router();
const transactions = require('../controllers/transactions');
const auth = require('../middlewares/auth');

router.post('/create-transaction', auth, transactions.createTransaction);
router.put('/proceed-to-payment/:id', transactions.proceedToPayment);

module.exports = router;
