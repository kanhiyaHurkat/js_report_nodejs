const db = require('../../../schemas/schema');

get_users = (req, res, next) => {
  get_users_data(req,function (status, _activity) {
    next(status, _activity);
  });
};


function get_users_data(req, next) {
  db.users.find().exec(function (err, response) {
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
      message: 'User fetched successfully',
      data: {items: [...response]}
    });

  })
}

module.exports = get_users;
