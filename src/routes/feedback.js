const express = require('express');
const { TokenCheckMiddleware } = require('../utils/middleware.js');
const router = express.Router();
const feedback_controller = require('../controllers/FeedbackController');
router.get('/index',TokenCheckMiddleware,feedback_controller.index)
router.post('/add-feedback',TokenCheckMiddleware,feedback_controller.addFeedback)
router.delete('/feed-delete/:id',TokenCheckMiddleware,feedback_controller.deleteFeedback)
router.get('/get-feed-by-id/:id',TokenCheckMiddleware,feedback_controller.getFeedById)
router.put('/edit-feedback/:id',TokenCheckMiddleware,feedback_controller.editFeedback)
module.exports = router;