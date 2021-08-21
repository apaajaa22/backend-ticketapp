const router = require('express').Router();
const auth = require('../middlewares/auth');
const file = require('../helpers/fileAttachment');
const chat = require('../controllers/chats');

router.get('/chat', auth, chat.getLatestUserChat);
router.post('/send/:id', auth, file, chat.createChat);

module.exports = router;
