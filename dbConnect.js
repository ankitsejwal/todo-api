const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
  mongoose.connection.on('disconnected', () => console.log('disconnected from MongoDB'));
  mongoose.connection.on('error', (error) => console.log('MongoDB connection error: '), error);
};
