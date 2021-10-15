const add_user = require('./add_user');
const add_school = require('./add_school');
const add_contact = require('./add_contact');
const add_score = require('./add_score');
const add_class_attendance = require('./add_class_attendance');
const add_last_rating = require('./add_last_rating');
const get_users = require('./get_users')
const get_user_by_id = require('./get_user_by_id')
const print_user_by_id = require('./print_user_by_id')
const print_users = require('./print_users')
const delete_user = require('./delete_user')

module.exports = {
  add_user,
  add_school,
  add_contact,
  add_score,
  add_class_attendance,
  add_last_rating,
  get_users,
  get_user_by_id,
  print_users,
  print_user_by_id,
  delete_user
}
