"use client";
import React, { useEffect } from "react";
import { useState } from "react";

import { AuthContextProvider } from "../_utils/auth-context";
import { useUserAuth } from "../_utils/auth-context";

import { signInWithEmailAndPassword, signOut, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../_utils/firebase";

//Auth.js test
import {signIn} from "@/auth";
//import stupidSignup from "./login-sql";
import { getUserByLogin } from "@/_utils/database-services";

const LoginPage = () => {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [signInEmail, setSignInEmail] = React.useState("");
	const [signInPassword, setSignInPassword] = React.useState("");

	const [testResult, setTestResult] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		//Data from test database
		fetch("/api/test")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTestResult(data.users);
			});
		//Data from test users
		fetch("/api/test-get-users")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setUsers(data.users);
			});
	}, []);

	//Firebase auth
	function handleEmailPasswordSignIn(e){
		e.preventDefault();
		
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			console.log("User signed in");
			console.log(userCredential);
		})
		.catch((error) => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === 'auth/invalid-credential') {
				alert('Invalid email or password');
			}
			else
			{
				console.log(errorCode, "Error message is ", errorMessage);
			}
		  });
	}

	//Auth.js functions
	async function signUp(e){
		e.preventDefault();
		
		//Pick id 1 higher than the last user
		let newID = 1
		for (let i = 0; i < users.length; i++){
			if (users[i].user_id >= newID){
				newID = users[i].user_id + 1;
			}
		}
		const newUser = {
			user_id: newID,
			user_email: email,
			user_password: password
		}

		fetch("/api/test-add-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				alert("User added successfully")
			})
			.catch((error) => 
			{
				console.log(error)
				alert("Error adding user")
			}
		);
	}

	async function TestSignIn(e){
		//console.log("preventDefault should be here")
		e.preventDefault();
		//console.log("Signing in?")
		//console.log(signInEmail)
		//console.log(signInPassword)
		//Quick test to see if the user is in the database
		const user = await getUserByLogin(signInEmail, signInPassword);

		if (user.users.length > 0){
			alert("User found");
			//console.log(user);
		}
		else
		{
			alert("Who are you looking for?");
		}
		
		/*const authUser = await signIn(signInEmail, signInPassword);

		if (authUser){
			console.log("User signed in");
			console.log(authUser);
		}
		else
		{
			alert("Who are you looking for?");
		}*/

		console.log("End sign in");
	}


	return (
	<div className="flex flex-col">
		<h1>Log in</h1>
		<h3>Firebase, deprecated</h3>
		<form onSubmit={handleEmailPasswordSignIn}>
			<label>
				Username:
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
			</label>
			<label>
				Password:
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
			</label>
			<button type="submit">Log in</button>
		</form>
		<AuthContextProvider>
			<LoginTest />
		</AuthContextProvider>
		<div className="flex flex-col">
			<h1>Test results</h1>
			<p>Raw data: {testResult && JSON.stringify(testResult)}</p>
			{Array.isArray(testResult) ?
			testResult.map((user, index) => {
				return (
					<div key={index}>
						<div>{user.idtest_table}</div>
						<div>{user.test_tablecol}</div>
						<div>{user.test_tablecol1}</div>
					</div>
				);
			})
		: <p>Error parsing data</p>}
		</div>
		<h1>AuthJS test</h1>
		<h2>Create Account</h2>
		<div>
			<form onSubmit={signUp}>
				<label>
					Email:
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
				</label>
				<label>
					Password:
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
				</label>
				<button type="submit">Sign up</button>
			</form>
		</div>
		<h2>Sign in</h2>
		<div>
			<form onSubmit={TestSignIn}>
				<label>
					Email:
					<input value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} placeholder="Email" />
				</label>
				<label>
					Password:
					<input type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} placeholder="Password"/>
				</label>
				<button type="submit">Sign in</button>
			</form>
		</div>
		<h2>Current users:</h2>
		{Array.isArray(users) ?
			users.map((user, index) => {
				return (
					<div key={index}>
						<div>{user.user_id} : {user.user_email}, {user.user_password}</div>
					</div>
				);
			})
		: <p>Loading...</p>}
	</div>
);
}

export default LoginPage;

const LoginTest = () => {
	const {user, firebaseSignOut} = useUserAuth();
	return (
		<div>
			<h1>Logged in as {user ? user.email : "No user"}</h1>
			<button onClick={firebaseSignOut}>Sign out</button>
		</div>
	)
}