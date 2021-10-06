const express = require('express');
const router = express.Router();
const fs = require('fs');
// const excelTemplate = require('./../template/project-portfolio-dashboard-template.xlsx')
const request = require('request')
const client = require('jsreport-client')('http://localhost:8001')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    /*const htmlTemplate = await fs.readFileSync( __dirname + '/../template/excel-handle.handlebars', function (err, data) {
        if (err) {
            console.log('File Read Error: ', err)
            throw err;
        }
    });*/
    const data = {
        template: {shortid:'rkJTnK2ce'},
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
    /*client.render({
        template: { content: htmlTemplate.toString(), recipe: 'chrome-pdf', engine: 'none' }
    }, { timeout: 5000 }).then((response) => response.pipe(res))
        .catch(next)*/
});

module.exports = router;
