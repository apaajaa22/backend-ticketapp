const router = require('express').Router();
const tickets = require('../controllers/tickets');

router.put('/update-ticket/:id', tickets.updateTicket);

module.exports = router;
