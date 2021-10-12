const express = require('express');
const router = express.Router();
const fs = require('fs')
const client = require('jsreport-client')('http://localhost:8001')

let htmlTemplate = null

readHtmlTemplate().then(html => htmlTemplate = html)

async function readHtmlTemplate() {
    const template = await fs.readFileSync( __dirname + '/../template/registration-form.html', function (err, _) {
        if (err) {
            console.log('File Read Error: ', err)
            throw err;
        }
    });
    return template.toString()
}

router.get('/form', async function(req, res, next) {
    client.render({
        template: {content: htmlTemplate.toString(), recipe: 'html', engine: 'handlebars'}
    }, { timeout: 5000 }).then((response) => response.pipe(res))
        .catch(next)
});

router.get('/get_user', async function(req, res, _) {
    let data = localStorage.getItem('users');
    res.status(200).send({
        data
    })
});

router.post('/add_user', async function(req, res, _) {
    const registerUser = []
    const localUserData = JSON.parse(localStorage.getItem('users'))
    if (localUserData) {
        registerUser.push(...localUserData)
    }

    if (!registerUser.length) {
        const user = []
        user.push(req.body)
        localStorage.setItem('users', JSON.stringify(user))
    } else {
        registerUser.push(req.body)
        localStorage.setItem('users', JSON.stringify(registerUser))
    }
    res.status(200).send({
        message: 'User added successfully',
        data: req.body
    })
});

router.get('/view_users', async function(req, res, next) {
    client.render({
        template: {shortid: '5SY-K7zjnb'}
    }, { timeout: 5000 }).then((response) => response.pipe(res))
      .catch(next)
});

router.get('/view_user/:id', async function(req, res, next) {
    const localUserData = JSON.parse(localStorage.getItem('users'))
    let user
    if (localUserData) {
        user = localUserData.find(user => user.studentId === req.params.id)
    }
    client.render({
        template: {shortid: 'B1gfxleFPL', data: {students: [user]}}, options: {preview: true}
    }, { timeout: 5000 }).then((response) => response.pipe(res))
      .catch(next)
});

module.exports = router;
