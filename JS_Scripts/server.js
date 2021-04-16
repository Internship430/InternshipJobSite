const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
	host: "localhost",
	user: "InternshipAdmin",
	password: "430Admin",
	database: "internship"
};

const pool = new Pool(config);

app.use(function (req, res, next)
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
})

if(process.env.NODE_ENV === 'production'){
	console.log('running production server');
	app.use(express.static('client/build'));
}

app.listen(port, () => {
    console.log('App is Running on port', port)
});

require('./PassHasher/user.routes')(app);