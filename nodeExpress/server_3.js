var express = require('express');
var morgan = require('morgan');
//Import bodyParse, still need to install bodyParser into body module
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

//'dev' is one of the pre-formatted log outputs from morgan support
app.use(morgan('dev'));

//Make use of bodyParser
app.use(bodyParser.json());

app.all('/dishes', function(req, res, next){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //Only here calling next()
    next();
});

app.get('/dishes', function (req,res, next) {
    res.end('Will send all the dishes to you!')
});

app.post('/dishes', function(req, res, next){
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes', function (req, res, next) {
   res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', function (req, res, next) {
   res.end('Will send details of the dishes: ' + req.params.dishId + ' to you!')

});

app.put('/dishes/:dishId', function (req, res, next) {

    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', function (req, res, next) {
    res.end('Deleting dish: ' + req.params.dishId);
});

//Declare the public folder is in the node express folder
app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
    console.log(`Server is now running on http://${hostname}:${port}/`);
});