const _helpers = require('./helpers/import');

// Save User
addUser = (req, res) => {
  _helpers.add_user(req, res, async function (status, data) {
    res.status(status).json(data)
  });
};

// Get All Users
getUsers = (req, res) => {
  _helpers.get_users(req, res, async function (status, data) {
    res.status(status).json(data)
  });
};

// Get User by ID
getUserById = (req, res) => {
  _helpers.get_user_by_id(req, res, async function (status, data) {
    res.status(status).json(data)
  });
};

// Print User By Id
printUserById = (req, res) => {
  _helpers.print_user_by_id(req, res, async function (status, data) {
    res.status(status).json(data)
  });
};

// Print All Users
printUsers = (req, res) => {
  _helpers.print_users(req, res, async function (status, data) {
    res.status(status).json(data)
  });
};

// Delete User
deleteUser = (req, res) => {
  _helpers.delete_user(req, res, async function (status, data) {
    res.status(status).json(data)
  });
};


module.exports = { addUser, getUsers, getUserById, printUsers, printUserById, deleteUser };
