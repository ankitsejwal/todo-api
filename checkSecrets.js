module.exports = function () {
  if (!process.env.JWT_PVT_KEY) {
    console.log('FATAL ERROR: JWT_PVT_KEY is not defined');
    process.exit(1);
  }

  if (!process.env.MONGO_CONNECTION_STRING) {
    console.log('FATAL ERROR: MONGO_CONNECTION_STRING is not defined');
    process.exit(1);
  }
};
