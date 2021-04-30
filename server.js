//TESTING A SERVER
const express = require("express");
var http = require('http');
var fs = require('fs'); 
var url = require('url');
var site = require('http').createServer(createServer);

/* sql connection */
const bodyParser = require("body-parser");
const app = express();
//const port = process.env.PORT || 8000;
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "InternshipAdmin",
	password: "430Admin",
	database: "internship"
};

const pool = new Pool(config);  //database

function getReports(){
    app.get("/Database", async(req, res) => {
        const description = req.query.description;
    
        try{
            const template = "SELECT * FROM entries WHERE description ILIKE '%'||$1||'%'";
            const response = await pool.query(template, [req.query.q]);
    
            console.log(response.rows[0]);
            const responseMap = response.rows.map(function(item)
            {
                return {description: item.description, kcal: item.kcal, protein_g: item.protein_g, carbohydrate_g: item.carbohydrate_g, fat: (item.fa_sat_g + item.fa_mono_g + item.fa_poly_g)};
            });
            res.json({responseMap});
        }
        catch(err){
            console.error("Error running query " + err);
            res.json({status: "Error running query " + err});
        }
    });
}

app.post('/register', async (req, res) => {
    try {
        let user = new User(
            {
                name: req.body.name,
                email: req.body.email,
                password: await hash(req.body.password)
            })

        try {
            if (name == undefined || email == undefined || password == undefined) {
                console.error("Error: Parameters not given");
                res.json({ status: "Error: Parameters not given" });
            }
            else {
                const template = "SELECT Uname FROM Users WHERE Uname = $1";
                const response = await pool.query(template, [name]);

                if (response.rowCount != 0) {
                    console.error('username taken');
                    res.json({ status: 'username taken' });
                }
                else {
                    const template = "INSERT INTO Users (name, email, password) VALUES ($1, $2, $3)";
                    const response = await pool.query(template, [name, email, password])
                    console.error('user added');
                    res.json({ status: "user added" });
                }
            }
        }
        catch (err) {
            console.error("Error running query " + err);
            res.json({ status: "Error running query " + err });
        }
        /*try {
            let user = new User(
            {
                name: req.body.name,
@@ -23,7 +70,7 @@ module.exports = (app) => {
            })*/
    } catch (err) {
        //handle error
    }
});


/*running website*/
function createServer(req, res) {
    var path = url.parse(req.url).pathname;
    if(path == "/" || path == ""){  //if there is no location specified go to index
        path = "/index.html"
    }
    
    var fsCallback = function(error, data) { 
        if(error){ //catches errors
            throw error;
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'}); //returns connection is good in HTML format
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

    if(path.includes(".html")||path.includes(".css")){ //checks path a is not javascript file
        path = "/html_Pages" + path; //looking in html_Pages dir for html file
        doc = fs.readFile(__dirname + path, fsCallback);
    } else if(path.includes(".js")) {
        doc = fs.readFile(__dirname + path, fsCallback);
    } else {
        res.writeHead(204).end;
    }
}
site.listen(8000);