import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../Pages/style.css'

export default function Home(props) 
{
  	return 
  	(
  		<div class="index">
  		<div class="logo">UMW</div>
  		<div class="sublogo">CPSC Major Opprotunities</div>
			<hr color="white">
			<br><br>
			<center><div class="desc">
				New Here? 
				<br><br>
				<!-- This links to the "login.html" file-->
				<button class="gradBtn" onclick='document.location.href = "./register.html";'>Create Account</button>
			</div>
			<div class="desc">
				Already have an account? Welcome back!
				<br>
				<br>
				<button class="gradBtn" onclick='document.location.href = "./login.html";'>Student Login</button> &nbsp;&nbsp;&nbsp;
				<button class="gradBtn" onclick='document.location.href = "./login.html";'>Employee / Alumni Login</button> &nbsp;&nbsp;&nbsp;
				<button class="gradBtn" onclick='document.location.href = "./login.html";'>Admin Login</button> 
		</div></center>
		</div>
	);
}