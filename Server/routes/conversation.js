const router = require('express').Router();
const conversationController = require('../Controllers/conversationController');

router.post('/', conversationController.postConversation);

router.get('/:userId', conversationController.getConversation);

router.get('/find/:firstUserId/:secondUserId', conversationController.findConversation);

module.exports = router;