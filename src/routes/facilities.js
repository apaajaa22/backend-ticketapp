const router = require('express').Router();
const auth = require('../middlewares/auth');
const facilities = require('../controllers/facilites');

router.post('/create', auth, facilities.createFacilites);

module.exports = router;
