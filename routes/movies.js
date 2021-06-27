const express = require('express');

// Init Router.
const router = express.Router();

// Load Movies Controllers.
const { movies } = require('../controllers/movies');

// Create Routes.
router.route('/').get(movies);

module.exports = router;
