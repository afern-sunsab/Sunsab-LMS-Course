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

const LoginPage = () => {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [testResult, setTestResult] = useState([]);

	useEffect(() => {
		fetch("/api/test")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTestResult(data.users); // Set data object directly in state
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
			else{
			console.log(errorCode, "Error message is ", errorMessage);
			}
		  });
	}

	//Auth.js functions
	async function signUp(e){
		e.preventDefault();
		
		const newUser = {
			user_id: 1,
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
			})
			.catch((error) => 
				console.log(error)
			);
		/*const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'cringe',
			database: 'test_schema',
			port: 3306,
			authPlugin: 'mysql_native_password'
		})
		const user_id = 1;
		const user_email = email;
		const user_password = password;
		const query = `INSERT INTO test_users (user_id, user_email, user_password) VALUES (${user_id}, ${user_email}, ${user_password})`;
		connection.query(query, (error, results) => {
			if (error) {
				return res.status(500).json({ error })
			}
			res.status(200).json({ users: results })
			connection.end()
		})
		connection.end()*/
	}

	async function signIn(e){
		e.preventDefault();
		const user = await signIn(email, password);
		console.log(user);
	}


	return (
	<div className="flex flex-col">
		<h1>Log in</h1>
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