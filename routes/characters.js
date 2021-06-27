const express = require('express');

// Init Router.
const router = express.Router();

// Load controller
const { characters } = require('../controllers/characters');

// Routes.
router.route('/').get(characters);

module.exports = router;
