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
  }
})

module.exports = mongoose.model('class_attendance', ClassAttendanceSchema);
