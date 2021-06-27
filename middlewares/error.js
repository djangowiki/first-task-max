const ErrorResponse = require('../helpers/errorResponse');

const errorHandler = (err, req, res, next) => {
  // Dev Error Log.
  console.log(err);
  //   Cast Error
  if (err.name === 'CastError') {
    err = new ErrorResponse(
      `Resource with the id ${err.value} does not exists`,
      400
    );
  }
  //   ValidationError
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    err = new ErrorResponse(message, 400);
  }
  //   Duplicate Error.
  if (err.code === 11000) {
    err = new ErrorResponse('Duplicate Field Error', 400);
  }
  // Api Error Response
  res
    .status(err.statusCode || '500')
    .json({ success: false, error: err.message || 'Server Error' });
};

module.exports = errorHandler;
