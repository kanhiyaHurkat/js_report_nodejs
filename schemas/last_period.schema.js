const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LastPeriodSchema = new Schema({
  period: {
    type: Number,
    default: ''
  },
  highCourses: {
    type: Number,
    default: ''
  },
  mediumCourses: {
    type: Number,
    default: ''
  },
  lowCourses: {
    type: Number,
    default: ''
  },

})

module.exports = mongoose.model('last_period', LastPeriodSchema);
