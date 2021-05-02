//TESTING A SERVER
var http = require('http');
var fs = require('fs'); 
var url = require('url');
var app = require('http').createServer(createServer);
//var sql = require('mysql');

function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    if(path == "/" || path == ""){  //if there is no location specified go to index
        path = "/index.html"
    }
    
    var fsCallback = function(error, data) { 
        if(path.includes("favicon.ico")){
            res.writeHead(204).end;
        } else if(error){ //catches errors
            //doc = fs.readFile(__dirname + "/404.html", fsCallback);
            throw error;
        } else {
        
		res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    }


    var full_path = path; //in case we need the whole thing later
    var quest = path.indexOf("?");
    var js = path.indexOf(".js");   
    if (quest != -1) {
        path = path.slice(0,quest); //removes everything after question mark
    }

    if (js == -1){ //checks path a is not javascript file
        path = "/html_Pages" + path; //looking in html_Pages dir for html file
        doc = fs.readFile(__dirname + path, fsCallback);
    } else {
        fs.readFile(__dirname + path, fsCallback);
    }
}
app.listen(8000);
