var express = require('express'),
    http = require('http');

var hostname = 'localhost';
var port = 3000;

var app = express();

//Create middleware with Express
app.use(function (req, res, next) {
    console.log(req.headers);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html><body><h1>Hello Server!</h1></body></html>');
});

//Create the Server
var server = http.createServer(app);

server.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
})