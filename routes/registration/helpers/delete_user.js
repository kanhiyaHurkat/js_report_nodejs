const db = require("../../../schemas/schema");

const delete_users = (req, res, next) => {
  delete_users_data(req, res, function (status, _activity) {
    next(status, _activity);
  });
};

function delete_users_data(req, res, next) {

  const deleteUserIds = req.body.deletedItems

  db.users.deleteMany({_id: {$in: deleteUserIds}}).exec(function (err, response) {
    if (err) {
      console.log('Get Users Error: ', err)
      next(500, {
        status: 500,
        message: err.message,
        data: null
      });
    }
    next(200, {
      status: 200,
      message: 'User/s Deleted Successfully',
      data: response
    });
  })
}

module.exports = delete_users
