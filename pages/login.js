"use client";
import React, { useEffect } from "react";
import { useState } from "react";

import { AuthContextProvider } from "../_utils/auth-context";
import { useUserAuth } from "../_utils/auth-context";

import { signInWithEmailAndPassword, signOut, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../_utils/firebase";

//MySQL test
/*const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'cringe',
	database: 'test_schema',
	port: 3306
});

connection.connect((err) => {
	if (err)
	{
		console.log("Error connecting to database");
		return;
	}
	console.log("Connected to database");
});

const query = 'SELECT * FROM test_table';
//Second query that only selects the column with idtest_table = 2
const query2 = 'SELECT * FROM test_table WHERE idtest_table = 2';*/

const LoginPage = () => {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [testResult, setTestResult] = useState([]);
	const [testResult2, setTestResult2] = useState("Nothin yet 2");

	useEffect(() => {
		/*connection.query(query, (err, rows, fields) => {
			if (err)
			{
				console.log("Error with query");
				return;
			}
			console.log("Got results");
			console.log(rows);
			setTestResult(JSON.stringify(rows));
		});

		//Second query
		connection.query(query2, (err, rows, fields) => {
			if (err)
			{
				console.log("Error with query");
				return;
			}
			console.log("Got results");
			console.log(rows);
			setTestResult2(JSON.stringify(rows));
		});*/
		//Gott fetch instead, apparently
		fetch("/api/test")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setTestResult(data.users); // Set data object directly in state
  });
	}, []);

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