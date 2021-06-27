// Modules
const express = require('express');
const dotenv = require('dotenv');
const hpp = require('hpp');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');

// Init app
const app = express();
// Load env vars.
dotenv.config({ path: './config/env.env' });

// Custom Modules.
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');
const limiter = require('./middlewares/limitRequests');
const movies = require('./routes/movies');
const characters = require('./routes/characters');
const comments = require('./routes/comments');

// Init DB
connectDB();

// Middlewares.
app.use(express.json()); // for req.body / body parser
app.use(hpp());
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Load Routes
app.use('/api/v1/star-wars/movies', movies);
app.use('/api/v1/movies/characters', characters);
app.use('/api/v1/movie/comments/', comments);
// Error Handler Middleware
app.use(errorHandler);

// Custom Middlewares
app.use(limiter);

// Create Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
