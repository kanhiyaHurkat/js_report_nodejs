const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const data = {
        template: {shortid:'HJH11D83ce'},
        options: {
            preview: true
        }
    }
    const options = {
        uri: 'http://localhost:8001/api/report',
        method: 'POST',
        json: data
    }
    request(options).pipe(res)
});

module.exports = router;
