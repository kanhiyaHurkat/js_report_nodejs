const db = require('../../../schemas/schema');

add_last_rating = (userId, req, res, next) => {
  return add_last_rating_data(userId, req,function (status, _activity) {
    next(status, _activity);
  });
};


function add_last_rating_data(userId, req, next) {
  let lastRatings = [...req.body.lastRating]
  let newLastRating = []
  let lastRatingIds = []

  if (lastRatings && lastRatings.length) {
    lastRatings.map(rating => {
      rating.user_id = userId
      if (rating._id) {
        lastRatingIds.push(rating._id)
      }else {
        delete rating._id
        newLastRating.push(rating)
      }
    })
  }
  return new Promise((resolve, reject) => {
    db.last_period.create(newLastRating, function (err, response) {
      if (err) {
        console.log('Create Last Period Rating Error: ', err)
        reject(err)
      }
      response.map(lastRating => lastRatingIds.push(lastRating._id))
      resolve(lastRatingIds)
    })
  })
}

module.exports = add_last_rating;
