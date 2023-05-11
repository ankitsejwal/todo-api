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

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 18,
    lowercase: true,
  },
  unfinishedItems: [String],
  finishedItems: [String],
});

module.exports = mongoose.model('Todo', todoSchema);
