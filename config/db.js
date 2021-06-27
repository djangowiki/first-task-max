const mongoose = require('mongoose');

// Connect Database Function.
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`MongoDB Connected on the server ${conn.connection.host}`);
};

module.exports = connectDB;
