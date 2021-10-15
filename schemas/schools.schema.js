const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchoolSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  yearStart: {
    type: String,
    default: ''
  },
  yearEnd: {
    type: String,
    default: ''
  },
  user_id: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('school', SchoolSchema);
