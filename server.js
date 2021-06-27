// Modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
// const hpp = require('hpp');
// const helmet = require('helmet');
// const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const cors = require('cors');

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
// CSP Error on client side made me comment this. We live to fight another day
// app.use(hpp());
// app.use(xss());
// app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// cors fix / making sure an outside client can use this api without issues
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Serving Static Files / React App in Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder.
  app.use(express.static('api-client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'api-client', 'build', 'index.html'));
  });
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
