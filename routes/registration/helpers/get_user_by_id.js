const db = require('../../../schemas/schema');
const mongoose =require('mongoose')
const client = require('jsreport-client')('http://localhost:8001')

const get_user_by_id = (req, res, next) => {
  get_user_by_id_data(req, res, function (status, _activity) {
    next(status, _activity);
  });
};


function get_user_by_id_data(req, res, next) {
  const userId = req.params.id

  const queryPipeline = []

  const userIdMatchQuery = {
    _id: mongoose.Types.ObjectId(userId)
  }
  queryPipeline.push({$match: userIdMatchQuery})

  const lookUpSchoolsQuery = {
    from: 'schools',
    localField: 'schools',
    foreignField: '_id',
    as: 'schools'
  }

  queryPipeline.push({$lookup: lookUpSchoolsQuery})

  const lookUpContactsQuery = {
    from: 'emergency_contacts',
    localField: 'contacts',
    foreignField: '_id',
    as: 'contacts'
  }

  queryPipeline.push({$lookup: lookUpContactsQuery})

  const lookUpScoreQuery = {
    from: 'scores',
    localField: 'scores',
    foreignField: '_id',
    as: 'scores'
  }

  queryPipeline.push({$lookup: lookUpScoreQuery})

  const lookUpAttendanceQuery = {
    from: 'class_attendances',
    localField: 'attendance',
    foreignField: '_id',
    as: 'attendance'
  }

  queryPipeline.push({$lookup: lookUpAttendanceQuery})

  const lookUpLastRatingQuery = {
    from: 'last_periods',
    localField: 'lastRating',
    foreignField: '_id',
    as: 'lastRating'
  }

  queryPipeline.push({$lookup: lookUpLastRatingQuery})

  db.users.aggregate(queryPipeline).exec(function (err, response) {
    if (err) {
      console.log('Get Users Error: ', err)
      next(500, {
        status: 500,
        message: err.message,
        data: null
      });
    }
    if (response && response.length) {
      next(200, {
        status: 200,
        message: 'User fetched successfully',
        data: response[0]
      });
    }
    /*client.render({
      template: {shortid: 'B1gfxleFPL', data: {students: response}}, options: {preview: true}
    }, {timeout: 5000}).then((response) => response.pipe(res))
      .catch(next)*/
  })
}

module.exports = get_user_by_id;
