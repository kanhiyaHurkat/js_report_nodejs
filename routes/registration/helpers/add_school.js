const db = require('../../../schemas/schema');

add_school = (req, res, next) => {
  return add_school_data(req,function (status, _activity) {
    next(status, _activity);
  });
};


function add_school_data(req, next) {
  let schools = [...req.body.schools]

  let newSchool = []
  let schoolIds = []

  if (schools && schools.length) {
    schools.map(school => {
      if (school._id) {
        schoolIds.push(school._id)
      }else {
        delete school._id
        newSchool.push(school)
      }
    })
  }
  return new Promise((resolve, reject) => {
    db.school.create(newSchool, function (err, response) {
      if (err) {
        console.log('Create School Error: ', err)
        reject(err)
      }
      response.map(school => schoolIds.push(school._id))
      resolve(schoolIds)
    })
  })
}

module.exports = add_school;
