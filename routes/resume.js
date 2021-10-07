const express = require('express');
const router = express.Router();
const client = require('jsreport-client')('http://localhost:8001')
// const request = require('request')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    /*const data = {
        template: {shortid:'B1gfxleFPL'},
        options: {
            preview: true
        }
    }
    const options = {
        uri: 'http://localhost:8001/api/report',
        method: 'POST',
        json: data
    }
    request(options).pipe(res)*/
    client.render({
        template: {shortid:'B1gfxleFPL'}, options: {
            preview: true
        }
    }, { timeout: 5000 }).then((response) => response.pipe(res))
        .catch(next)
});

module.exports = router;
