import React from 'react';
//import Button from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';
//import '../pages/style.css'

export default function Home(props) 
{
  	return 
  	(
  		<div className="index">
  		<div className="logo">UMW</div>
  		<div className="sublogo">CPSC Major Opprotunities</div>
			<hr color="white" />
			<br /><br />
			<center><div className="desc">
				New Here? 
				<br /><br />
				//This links to the "login.html" file
				<button class="gradBtn" onclick='document.location.href = "./register.html";'>Create Account</button>
			</div>
			<div className="desc">
				Already have an account? Welcome back!
				<br />
				<br />
				<button class="gradBtn" onclick='document.location.href = "./login.html";'>Student Login</button> &nbsp;&nbsp;&nbsp;
				<button class="gradBtn" onclick='document.location.href = "./login.html";'>Employee / Alumni Login</button> &nbsp;&nbsp;&nbsp;
				<button class="gradBtn" onclick='document.location.href = "./login.html";'>Admin Login</button> 
		</div></center>
		</div>
	);
}
