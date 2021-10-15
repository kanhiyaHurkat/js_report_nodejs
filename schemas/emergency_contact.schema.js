const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmergencyContactSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    default: ''
  },
  relationship: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('emergency_contact', EmergencyContactSchema);
