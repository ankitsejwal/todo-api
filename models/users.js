const mongoose = require('mongoose');
const config = require('config');

mongoose
  .connect(
    `mongodb+srv://${config.get('MONGO_USERNAME')}:${config.get(
      'MONGO_PASSWORD'
    )}@vidly.zivn542.mongodb.net/vidly`
  )
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 18,
    require: true,
  },
  email: { type: String, min: 8, max: 50, require: true },
  phone: { type: String, min: 8, max: 10, require: true },
  password: { type: String, min: 8, require: true },
});

module.exports = mongoose.model('User', userSchema);
