const router = require('express').Router();
const userController = require('../Controllers/usersController');

router.get('/', userController.baseRoute);

router.get('/find/:id', userController.findUsers);

router.get('/request/:id/:friendId', userController.requests);

router.put('/request/:id/:friendId', userController.sendRequest);

router.get('/friendrequests/:id', userController.getFriendRequest);

router.put('/accept/:id/:friendId', userController.acceptRequest);

router.put('/reject/:id/:friendId', userController.rejectRequest);

router.put('/profile', userController.updateProfile);

router.put('/password', userController.changePassword);

router.put('/forgotpsd', userController.forgotPassword);

router.get('/friends/:userId', userController.getFriends);

module.exports = router;