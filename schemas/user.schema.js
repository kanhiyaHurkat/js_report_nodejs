const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  studentId: {
    type: String,
    default: ''
  },
  picture: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  dob: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: ''
  },
  enteredDate: {
    type: String,
    default: ''
  },
  schools: [{
    type: Schema.Types.ObjectId, ref: 'school'
  }],
  contacts: [{
    type: Schema.Types.ObjectId, ref: 'emergency_contact'
  }],
  scores: [{
    type: Schema.Types.ObjectId, ref: 'score'
  }],
  attendance: [{
    type: Schema.Types.ObjectId, ref: 'class_attendance'
  }],
  lastRating: [{
    type: Schema.Types.ObjectId, ref: 'class_attendance'
  }],
})

module.exports = mongoose.model('users', UserSchema);
