//TESTING A SERVER
var http=require('http');
var fs = require('fs'); 
var url = require('url');
var app = require('http').createServer(createServer);

function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    var fsCallback = function(error, data) {
        if(error){
            res.writeHead(404);
            res.write(data);
            res.end();
            doc = fs.readFile(__dirname + "/404.html", fsCallback);
            throw error;
        } 
        
        res.writeHead(200);
        res.write(data);
        res.end();
    }
   
    if(path == "/" || path == ""){
        path = "/index.html"
    }
    doc = fs.readFile(__dirname + path, fsCallback);
}
app.listen(8000);