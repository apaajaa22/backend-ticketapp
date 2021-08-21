const router = require('express').Router();
const auth = require('../middlewares/auth');
const itemFacilities = require('../controllers/itemFacilites');

router.get('/', auth, itemFacilities.getItemFacilites);
router.post('/create', auth, itemFacilities.createItemFacilities);

module.exports = router;
