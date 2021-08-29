const router = require('express').Router();
const notifications = require('../controllers/notifications');
const auth = require('../middlewares/auth');

router.post('/create-notification', auth, notifications.createNotification);
router.get('/get-notification', auth, notifications.getNotifications);
router.delete('/delete-notification', auth, notifications.deleteNotifications);

module.exports = router;
