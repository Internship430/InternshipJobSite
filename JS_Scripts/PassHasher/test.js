const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const app = express();

// Defining middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

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

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect('mongodb://localhost:27017/hasher', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(port, () => {
    console.log('App is Running on port', port)
});

app.options('http://localhost:5000/register', function(req, res, next)
    {
       res.header('Access-Control-Allow-Origin', "*");
       res.header('Access-Control-Allow-Methods', 'POST');
       res.header("Access-Control-Allow-Headers", "accept, content-type");
       res.header("Access-Control-Max-Age", "1728000");
       return res.sendStatus(200);
    });

require('./user.routes')(app);
