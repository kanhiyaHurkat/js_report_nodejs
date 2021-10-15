const db = require('../../../schemas/schema');
const add_school = require("./add_school");
const add_contact = require("./add_contact");
const add_score = require("./add_score");
const add_class_attendance = require("./add_class_attendance");
const add_last_rating = require("./add_last_rating");
const mongoose = require("mongoose");

const add_user = (req, res, next) => {
  add_user_data(req, res, function (status, _activity) {
    next(status, _activity);
  });
};


function add_user_data(req, res, next) {
  const queryPipeline = []

  const studentIdQuery = {
    studentId: req.body.studentId
  }

  queryPipeline.push({$match: studentIdQuery})

  const studentEmailQuery = {
    email: req.body.email
  }

  queryPipeline.push({$match: studentEmailQuery});

  (async () => {
    const queryResult = await db.users.aggregate(queryPipeline).exec()
    if (!req.body._id) {
      if (queryResult.length) {
        next(409, {
          status: 409,
          message: 'User already exist with given Student ID or Email ID',
          data: null
        });
      } else {
        let users = new db.users({
          studentId: req.body.studentId,
          picture: req.body.picture,
          name: req.body.name,
          gender: req.body.gender,
          dob: req.body.dob,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          language: req.body.language,
          enteredDate: req.body.enteredDate,
        })
        users.save(async function (err, response) {
          if (err) {
            next(500, {
              status: 500,
              message: err.message,
              data: null
            });
          } else {
            const userId = response._id.toString()
            let schoolIds = await add_school(userId, req, res, next)
            let contactIds = await add_contact(userId, req, res, next)
            let scoreIds = await add_score(userId, req, res, next)
            let attendanceIds = await add_class_attendance(userId, req, res, next)
            let lastRatingIds = await add_last_rating(userId, req, res, next)
            db.users.updateOne(
              {_id: mongoose.Types.ObjectId(userId)},
              {$set: {
                  schools: [...schoolIds],
                  contacts: [...contactIds],
                  scores: [...scoreIds],
                  attendance: [...attendanceIds],
                  lastRating: [...lastRatingIds]
              }}
            ).exec(function (updateError, updateResponse) {
              if (updateError) {
                console.log('User Update Error: ', updateError)
                next(500, {
                  status: 500,
                  message: updateError.message,
                  data: null
                });
              }
              next(200, {
                status: 200,
                message: 'User added successfully',
                data: response
              });
            })
          }
        })
      }
    }
    else {
      let schoolIds = await add_school(req.body._id, req, res, next)
      let contactIds = await add_contact(req.body._id, req, res, next)
      let scoreIds = await add_score(req.body._id, req, res, next)
      let attendanceIds = await add_class_attendance(req.body._id, req, res, next)
      let lastRatingIds = await add_last_rating(req.body._id, req, res, next)
      db.users.findOneAndUpdate(
        { _id : mongoose.Types.ObjectId(req.body._id) },
        { $set: {
            studentId: req.body.studentId,
            picture: req.body.picture,
            name: req.body.name,
            gender: req.body.gender,
            dob: req.body.dob,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            language: req.body.language,
            enteredDate: req.body.enteredDate,
            schools: schoolIds,
            contacts: contactIds,
            scores: scoreIds,
            attendance: attendanceIds,
            lastRating: lastRatingIds
          } }
      ).exec(function (err, response) {
        if (err) {
          next(500, {
            status: 500,
            message: err.message,
            data: null
          });
        } else {
          next(200, {
            status: 200,
            message: 'User updated successfully',
            data: response
          });
        }
      })
    }
  })()
}

module.exports = add_user;
