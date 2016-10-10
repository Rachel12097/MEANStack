var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

//Create the Server
var server = http.createServer(function (req, res) {
    // console.log(req.headers);
    //
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.end('<h1>Hello Server!</h1>');

    console.log('Request for' + req.url + 'by method ' + req.method);

    if(req.method == 'GET'){
        var fileUrl;

        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        //Get the folder files
        var filePath = path.resolve('./public' + fileUrl);

        //Check the extension of the filename. If request for index.html the extension will be '.html'
        var fileExt = path.extname(filePath);

        if (fileExt == '.html'){
            //Use file system module to check whether the file actually exist
            //The 'exist' parameter in function will be set to true if the file does exist
            fs.exists(filePath, function (exists) {

                if (!exists){
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                //File send back to the client
                fs.createReadStream(filePath).pipe(res);
            });
        }

        else{
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<h1>Error 404: ' + fileUrl + 'not found</h1>');
        }
    }
})

//Start the Server
server.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});