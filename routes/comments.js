const express = require('express');

// Init Router.
const router = express.Router();

// Load controllers.
const { addComment, comments } = require('../controllers/comments');

// Routes.
router.route('/').post(addComment);
router.route('/').get(comments);

module.exports = router;
