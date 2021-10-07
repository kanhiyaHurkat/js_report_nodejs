const express = require('express');
const router = express.Router();
// Using in Method 1
const client = require('jsreport-client')('http://localhost:8001')
// Using in Method 2
// const request = require('request')

/* GET users listing. */
router.get('/', async function(req, res, next) {
    /*const htmlTemplate = await fs.readFileSync( __dirname + '/../template/excel-handle.handlebars', function (err, data) {
        if (err) {
            console.log('File Read Error: ', err)
            throw err;
        }
    });*/

    //<editor-fold desc="Method: 1">
    /*const data = {
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
    request(options).pipe(res)*/
    //</editor-fold>

    //<editor-fold desc="Method: 2">
    client.render({
        template: {shortid:'rkJTnK2ce'}
    }, { timeout: 5000 }).then((response) => response.pipe(res))
        .catch(next)
    //</editor-fold>
});

module.exports = router;
