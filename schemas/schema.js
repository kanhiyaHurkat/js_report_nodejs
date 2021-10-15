const CltMdlPath = __dirname

module.exports = {
  users: require(CltMdlPath + '/user.schema.js'),
  school: require(CltMdlPath + '/schools.schema.js'),
  emergency_contact: require(CltMdlPath + '/emergency_contact.schema.js'),
  score: require(CltMdlPath + '/score.schema.js'),
  class_attendance: require(CltMdlPath + '/class_attendance.schema.js'),
  last_period: require(CltMdlPath + '/last_period.schema.js')
}
