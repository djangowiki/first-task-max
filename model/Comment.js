const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [500, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: false,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  text: {
    type: String,
    required: [true, 'Please enter comment for movie'],
    maxlength: [500, 'Comment cannot be more than 500 characters'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
