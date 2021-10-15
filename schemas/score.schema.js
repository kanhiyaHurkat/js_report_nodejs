const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScoreSchema = new Schema({
  period: {
    type: Number,
    default: ''
  },
  course: {
    type: String,
    default: ''
  },
  credits: {
    type: Number,
    default: ''
  },
  homeroom: {
    type: Number,
    default: ''
  },
  score: {
    type: Number,
    default: ''
  },
})

module.exports = mongoose.model('score', ScoreSchema);
