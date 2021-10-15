const db = require("../../../schemas/schema");

const delete_users = (req, res, next) => {
  delete_users_data(req, res, function (status, _activity) {
    next(status, _activity);
  });
};

function delete_users_data(req, res, next) {

  const deleteUserIds = req.body.deletedItems

  db.users.deleteMany({_id: {$in: deleteUserIds}}).exec(async function (err, response) {
    if (err) {
      console.log('Get Users Error: ', err)
      next(500, {
        status: 500,
        message: err.message,
        data: null
      });
    }
    Promise.all([
      db.school.deleteMany({user_id: {$in: deleteUserIds}}),
      db.emergency_contact.deleteMany({user_id: {$in: deleteUserIds}}),
      db.score.deleteMany({user_id: {$in: deleteUserIds}}),
      db.class_attendance.deleteMany({user_id: {$in: deleteUserIds}}),
      db.last_period.deleteMany({user_id: {$in: deleteUserIds}}),
    ]).then(_ => {
      next(200, {
        status: 200,
        message: 'User/s Deleted Successfully',
        data: response
      });
    })

    // await db.emergency_contact.deleteMany({user_id: {$in: deleteUserIds}})
    // await db.score.deleteMany({user_id: {$in: deleteUserIds}})
    // await db.class_attendance.deleteMany({user_id: {$in: deleteUserIds}})
    // await db.last_period.deleteMany({user_id: {$in: deleteUserIds}})

  })
}

module.exports = delete_users
