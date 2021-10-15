const db = require('../../../schemas/schema');

add_class_attendance = (userId, req, res, next) => {
  return add_class_attendance_data(userId, req,function (status, _activity) {
    next(status, _activity);
  })
};


function add_class_attendance_data(userId, req, next) {
  let attendance = [...req.body.attendance]

  let newClassAttendance = []
  let attendanceIds = []

  if (attendance && attendance.length) {
    attendance.map(attend => {
      attend.user_id = userId
      if (attend._id) {
        attendanceIds.push(attend._id)
      }else {
        delete attend._id
        newClassAttendance.push(attend)
      }
    })
  }

  return new Promise((resolve, reject) => {
    db.class_attendance.create(newClassAttendance, function (err, response) {
      if (err) {
        console.log('Create Class Attendance Error: ', err)
        reject(err)
      }
      response.map(attend => attendanceIds.push(attend._id))
      resolve(attendanceIds)
    })
  })
}

module.exports = add_class_attendance;
