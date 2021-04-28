//TESTING A SERVER
var http=require('http');
var fs = require('fs'); 
var url = require('url');
var app = require('http').createServer(createServer);

function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    var fsCallback = function(error, data) { 
        if(error){ //catches errors
            res.writeHead(404);
            res.write(data);
            res.end();
            doc = fs.readFile(__dirname + "/404.html", fsCallback);
            //throw error;
        } 
        
        res.writeHead(200);
        res.write(data);
        res.end();
    }
   
    if(path == "/" || path == ""){
        path = "/index.html"
    }

    var quest = path.indexOf("?");
    var js = path.indexOf(".js");
    if (quest != -1) {
        path = path.slice(0,quest);
    }

    if (js == -1){
        path = "/html_Pages" + path;
        doc = fs.readFile(__dirname + path, fsCallback); //url used to be __dirname
    } else {
        fs.readFile(__dirname + path, fsCallback);
    }
}
app.listen(8000);