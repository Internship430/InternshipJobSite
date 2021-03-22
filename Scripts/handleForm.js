function sendJSON()
{       
	let result = document.querySelector('.result'); 
    let name = document.querySelector('#name'); 
    let email = document.querySelector('#email'); 
    let password = document.querySelector('#password'); 
    let request = document.querySelector('#request'); 
       
    // Creating a XHR object 
    let xhr = new XMLHttpRequest(); 
    let url = "http://localhost:5000" + request.value; 

    // open a connection 
    xhr.open("POST", url, true); 

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json"); 

    // Create a state change callback 
    xhr.onreadystatechange = function () 
    { 
        if (xhr.readyState === 4 && xhr.status === 200) 
        { 
            // Print received data from server 
            //result.innerHTML = this.responseText; 

            if(request.value == "/register")
            {
            	document.location.href = "./login.html"
            }
            else if(request.value == "/login")
            {
            	document.location.href = "./index.html"
            }
        } 
        if (xhr.readyState === 4 && xhr.status === 400) 
        { 
            if(request.value == "/login")
            {
            	var x = document.getElementById("incorrectLoginDiv");
				if (x.style.display === "none") 
				{
			    	x.style.display = "block";
			  	} 
			  	else 
			  	{
			    	x.style.display = "none";
			  	}	
            }
        } 
    }; 

    // Converting JSON data to string 
    var data;
    if(request.value == "/register")
    {
        data = JSON.stringify({"name": name.value, "email": email.value, "password": password.value}); 
    }
    else if(request.value == "/login")
    {
    	data = JSON.stringify({"name": name.value, "password": password.value});
    }

    // Sending data with the request 
    console.log(data);
    xhr.send(data);
}