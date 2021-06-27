const axios = require('axios');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../helpers/errorResponse');

// @info - Fetches movie characters from the swapi using axios
// @endpoint - /api/v1/movies/characters
// @apiendpoint -  https://swapi.dev/api/films/
// @access   - Public Route
exports.characters = asyncHandler(async (req, res, next) => {
  try {
    // Fetch characters for a particular movie using axios.
    const response = await axios.get('https://swapi.dev/api/films/1/');
    const characters = response.data.characters;
    // Array for the Characters.
    let data = [];
    //   Loop through each character and make an axios request to fetch their data
    for (character of characters) {
      const response = await axios.get(character);
      // Push into our array for characters.
      data.push(response.data);
      if (data.length === characters.length) {
        if (req.query.gender) {
          data = data.filter((item) => item.gender === req.query.gender);
        }
        if (req.query.height) {
          data = data.filter((item) => item.height === req.query.height);
        }
        return res.status(200).json({ success: true, data });
      }
    }
  } catch (err) {
    console.error(err);
    return next(new ErrorResponse('Server Error', 500));
  }
});
