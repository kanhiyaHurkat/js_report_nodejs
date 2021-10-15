const db = require('../../../schemas/schema');

add_score = (req, res, next) => {
  return add_score_data(req,function (status, _activity) {
    next(status, _activity);
  });
};


function add_score_data(req, next) {
  let scores = [...req.body.scores]
  let newScores = []
  let scoreIds = []
  if (scores && scores.length) {
    scores.map(score => {
      if (score._id) {
        scoreIds.push(score._id)
      }else {
        delete score._id
        newScores.push(score)
      }
    })
  }
  return new Promise((resolve, reject) => {
    db.score.create(newScores, function (err, response) {
      if (err) {
        console.log('Create Score Error: ', err)
        reject(err)
      }
      response.map(score => scoreIds.push(score._id))
      resolve(scoreIds)
    })
  })
}

module.exports = add_score;
