const router = require('express').Router();
const transactions = require('../controllers/transactions');
const auth = require('../middlewares/auth');

router.get('/transaction', auth, transactions.getTransaction);
router.post('/create-transaction', auth, transactions.createTransaction);
router.put('/proceed-to-payment/:id', transactions.proceedToPayment);
router.get('/transaction/:id', auth, transactions.getTransactionDetail);

module.exports = router;
