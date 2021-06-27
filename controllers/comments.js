const axios = require('axios');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../helpers/errorResponse');
const Comment = require('../model/Comment');

// @info - Add annonymous comment to a movie
// @endpoint - /api/v1/movie/comments
// @apiendpoint -  https://swapi.dev/api/films/1
// @access   - Public Route
exports.addComment = asyncHandler(async (req, res, next) => {
  // Fetch a particular movie from the api
  const response = await axios.get('https://swapi.dev/api/films/1');
  // Fetch all the comments in the database.
  const comments = await Comment.find();
  //Build a custom object for the movie and add a comment.
  const movie = {
    title: response.data.title,
    opening_crawl: response.data.opening_crawl,
    comments_count: comments.length,
    comment: req.body,
  };
  // Looking for the remote Ip, the request module is deprecated in nodejs docs.
  console.log(req.connection.remoteAddress);
  // save comment to the database
  await Comment.create(req.body);
  // movie response with comment added.
  res.status(200).json({ success: true, data: movie });
});

// @info - Comment Lists
// @endpoint - /api/v1/movie/comments
// @access   - Public Route
exports.comments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find().sort({ date: -1 });
  res.status(200).json({ success: true, data: comments });
});
