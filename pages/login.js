import React from 'react';

/*export default function Login(props)
{
    return(
        <div>
        <h1>UMW COMPUTER SCIENCE JOB/INTERNSHIP SITE</h1>
            <h2>LOGIN</h2>
            <br /><br /><br />
            <div className="incorrectLoginDiv" id="incorrectLoginDiv">
                Wrong Login Details
            </div>
                <div className="center">
                <form>
                    <label for="name">Username:</label><br />
                        <input type="text" name="name" id="name" /><br /><br />
                    <label for="pass">Password:</label><br />
                        <input type="text" id="password" name="password" /><br /><br />

                    <input type="hidden" id="request" name="request" value="/login" />

                    <button onclick="sendJSON()">Submit</button>
                        <p className="result" style="color:green"></p> 
                    <script src="../JS_Scripts/handleForm.js"></script> 
                </form>
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h3>Not Registered? Register here!</h3>
            <br /><br /><br />
            <div className="center">
                <button type="button" onclick='document.location.href = "./register.html";'>REGISTER</button>
            </div>
        </div>
    );
}*/

var http = require('http'),
    fs = require('fs');


fs.readFile('./html_Pages/login.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});