const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassAttendanceSchema = new Schema({
  date: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  user_id: {
    type: String,
    default: null
  }
})

module.exports = mongoose.model('class_attendance', ClassAttendanceSchema);
