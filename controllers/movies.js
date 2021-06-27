const axios = require('axios');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../helpers/errorResponse');

// @info - Fetches movies from the swapi using axios
// @endpoint - /api/v1/star-wars/movies
// @apiendpoint -  https://swapi.dev/api/films/
// @access   - Public Route
exports.movies = asyncHandler(async (req, res, next) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films/');
    // Movie Response from swapi
    const movies = response.data.results;
    // Create an empty array for the custom movies list.
    const data = [];
    // Use a for loop to iterate over the movies and produce a custom list.
    for (movie of movies) {
      // Push the fields from the api I want to display into my array
      data.push({
        title: movie.title,
        opening_crawl: movie.opening_crawl,
        date: movie.release_date,
      });
      // Make sure all the movies from the api has loaded before return.
      if (data.length === movies.length) {
        //@todo Sort Array before return
        return res.status(200).json({ success: true, data });
      }
    }
  } catch (err) {
    console.error(err);
    return next(new ErrorResponse('Server Error', 500));
  }
});
