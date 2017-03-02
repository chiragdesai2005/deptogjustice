var aws = require('aws-sdk'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    express = require('express'),
    uuid = require('node-uuid');

var app = new express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//var config_path = path.join(__dirname, 'auth.json');
//aws.config.loadFromPath(config_path);

aws.config = new aws.Config();
aws.config.accessKeyId = "AKIAJL454U6I7WLIBXQQ";
aws.config.secretAccessKey = "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";

// Create an S3 client
var s3 = new aws.S3();
var filename = '';

var params = {
    Bucket: 'efileuploadbucket' /* required */
};

var putparams = {
    Bucket: 'efileuploadbucket', /* required */
    ACL: 'public-read',
    Key: filename
    //ObjectName: filename,
    //ContentLength: file_info.size,
    //Body: bodyStream
};


app.get('/buckets', function (req, res) {
    s3.listBuckets(function (err, data) {
        if (err) {
            console.log('error is ' + err);
            res.status(500)
            res.render('error', { error: err })
        } {
            res.json(data);
        }
    })
})

app.get('/getAllFiles', function (req, res) {
    s3.listObjectsV2(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            res.json(data.Contents);       // successful response
        }
    });
})

app.get('/putFile', function (req, res) {
    s3.putObject(putparams, function (err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            res.json(data);       // successful response
        }
    });
})

app.listen(3000, function () {
    console.log('S3 Bucket app listening on port 3000!')
})
module.exports = app;