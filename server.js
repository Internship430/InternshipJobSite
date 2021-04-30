//TESTING A SERVER
var http=require('http');
var fs = require('fs'); 
var url = require('url');
var app = require('http').createServer(createServer);
//var sql = require('mysql');

function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    var fsCallback = function(error, data) { 
        if(error){ //catches errors
            //doc = fs.readFile(__dirname + "/404.html", fsCallback);
            throw error;
        } 
        
        res.writeHead(200);
        res.write(data);
        res.end();
    }
   
    if(path == "/" || path == ""){
        path = "/index.html"
    }

    var full_path = path; //in case we need the whole thing later
    var quest = path.indexOf("?");
    var js = path.indexOf(".js");   //checks if path javascript file
    if (quest != -1) {
        path = path.slice(0,quest); //removes everything after question mark
    }

    if (js == -1){
        path = "/html_Pages" + path; //looking in html_Pages dir for html file
        doc = fs.readFile(__dirname + path, fsCallback);
    } else {
        fs.readFile(__dirname + path, fsCallback);
    }
}
app.listen(8000);