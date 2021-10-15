const express = require('express');
const router = express.Router();
const fs = require('fs')
const client = require('jsreport-client')('http://localhost:8001')
const db = require('../schemas/schema')

let htmlTemplate = null

readHtmlTemplate().then(html => htmlTemplate = html)

async function readHtmlTemplate() {
  const template = await fs.readFileSync(__dirname + '/../template/registration-form.html', function (err, _) {
    if (err) {
      console.log('File Read Error: ', err)
      throw err;
    }
  });
  return template.toString()
}

router.get('/form', async function (req, res, next) {
  client.render({
    template: {content: htmlTemplate.toString(), recipe: 'html', engine: 'handlebars'}
  }, {timeout: 5000}).then((response) => response.pipe(res))
    .catch(next)
});

router.get('/get_user', async function (req, res, _) {
  let data = localStorage.getItem('users');
  res.status(200).send({
    data
  })
});

router.post('/add_user', async function (req, res, _) {

  const queryPipeline = []

  const studentIdQuery = {
    studentId: req.body.studentId
  }

  queryPipeline.push({$match: studentIdQuery})

  const studentEmailQuery = {
    email: req.body.email
  }

  queryPipeline.push({$match: studentEmailQuery})

  const queryResult = await db.users.aggregate(queryPipeline).exec()

  if (queryResult.length) {
    res.status(409).send({
      status: 409,
      message: 'User already exist with given Student ID or Email ID',
      data: null
    })
  } else {

    let schoolIds = await saveSchool(req)
    let contactIds = await saveContacts(req)
    let scoreIds = await saveScore(req)
    let attendanceIds = await saveAttendance(req)
    let lastRatingIds = await saveLastRating(req)

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
      schools: schoolIds,
      contacts: contactIds,
      scores: scoreIds,
      attendance: attendanceIds,
      lastRating: lastRatingIds
    })
    users.save(function (err, response) {
      if (err) {
        res.status(500).send({
          status: 500,
          message: err.message,
          data: null
        })
      } else {
        res.status(200).send({
          status: 200,
          message: 'User added successfully',
          data: response
        })
      }
    })
  }
});

function saveSchool(req) {
  // let schools = [...req.body.schools]
  // let schoolIds = []
  // return new Promise((resolve, reject) => {
  //   db.school.create(schools, function (err, response) {
  //     if (err) {
  //       console.log('Create School Error: ', err)
  //       reject(err)
  //     }
  //     response.map(school => schoolIds.push(school._id))
  //     resolve(schoolIds)
  //   })
  // })
}

function saveContacts(req) {
  // let contacts = [...req.body.contacts]
  // let contactIds = []
  // return new Promise((resolve, reject) => {
  //   db.emergency_contact.create(contacts, function (err, response) {
  //     if (err) {
  //       console.log('Create Contact Error: ', err)
  //       reject(err)
  //     }
  //     response.map(contact => contactIds.push(contact._id))
  //     resolve(contactIds)
  //   })
  // })
}

function saveScore(req) {
  // let scores = [...req.body.scores]
  // let scoreIds = []
  // return new Promise((resolve, reject) => {
  //   db.score.create(scores, function (err, response) {
  //     if (err) {
  //       console.log('Create Score Error: ', err)
  //       reject(err)
  //     }
  //     response.map(score => scoreIds.push(score._id))
  //     resolve(scoreIds)
  //   })
  // })
}

function saveAttendance(req) {
  // let attendance = [...req.body.attendance]
  // let attendanceIds = []
  // return new Promise((resolve, reject) => {
  //   db.class_attendance.create(attendance, function (err, response) {
  //     if (err) {
  //       console.log('Create Class Attendance Error: ', err)
  //       reject(err)
  //     }
  //     response.map(attend => attendanceIds.push(attend._id))
  //     resolve(attendanceIds)
  //   })
  // })
}

function saveLastRating(req) {
  // let lastRatings = [...req.body.lastRating]
  // let lastRatingIds = []
  // return new Promise((resolve, reject) => {
  //   db.last_period.create(lastRatings, function (err, response) {
  //     if (err) {
  //       console.log('Create Last Period Rating Error: ', err)
  //       reject(err)
  //     }
  //     response.map(lastRating => lastRatingIds.push(lastRating._id))
  //     resolve(lastRatingIds)
  //   })
  // })
}

router.get('/users', async function (req, res, _) {
  await db.users.find().exec(function (err, response) {
    if (err) {
      res.status(500).send({
        status: 500,
        message: err.message,
        data: null
      })
    } else {
      res.status(200).send({
        status: 200,
        message: 'User list fetched successfully',
        data: {items: [...response]}
      })
    }

  })
});

router.get('/view_users', async function (req, res, next) {
  client.render({
    template: {shortid: '5SY-K7zjnb'}
  }, {timeout: 5000}).then((response) => response.pipe(res))
    .catch(next)
});

router.get('/view_user/:id', async function (req, res, next) {
  const localUserData = JSON.parse(localStorage.getItem('users'))
  let user
  if (localUserData) {
    user = localUserData.find(user => user.studentId === req.params.id)
  }
  client.render({
    template: {shortid: 'B1gfxleFPL', data: {students: [user]}}, options: {preview: true}
  }, {timeout: 5000}).then((response) => response.pipe(res))
    .catch(next)
});

module.exports = router;
