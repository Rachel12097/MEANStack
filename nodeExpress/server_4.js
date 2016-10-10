//Using Express router to do GET/POST/DELETE
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

//Express Router Used
var dishRouter = express.Router(); //Give access to Router object
dishRouter.use(bodyParser.json());
dishRouter.route('/') //'.all' will applied to dishRouter
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })

    .get(function(req, res, next){
        res.end('Will send all dishes!');
    })//No semicolon, it's a route chaining

    .post(function (req, res, next) {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .delete(function (req, res, next) {
        res.end('Deleting all dishes');
    });//Completed the chaining

//Another Express Router create here for dishId
dishRouter.route('/:dishId')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })

    .get(function (req, res, next) {
        res.end('Will send details of the dish: ' + req.params.dishId + ' !');
    })

    .put(function (req, res, next) {
        res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.descriiption);
    })

    .delete(function (req, res, next) {
        res.end('Deleting dish: ' + req.params.dishId);
    });

//Applied dishRouter
app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));
app.listen(port, hostname, function () {
    console.log(`Server runnning at http://${hostname}:${port}`);
});