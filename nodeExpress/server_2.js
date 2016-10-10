var express = require('express');
//Morgan allow us to log info into server side
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

//'dev' is one of the pre-formatted log outputs from morgan support
app.use(morgan('dev'));

//Declare the public folder is in the node express folder
app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
   console.log(`Server is now running on http://${hostname}:${port}/`);
});