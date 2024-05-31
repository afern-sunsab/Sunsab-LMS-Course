"use client";
import React from "react";
import { useState } from "react";

import { AuthContextProvider } from "../_utils/auth-context";
import { useUserAuth } from "../_utils/auth-context";

import { signInWithEmailAndPassword, signOut, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../_utils/firebase";

const LoginPage = () => {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

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