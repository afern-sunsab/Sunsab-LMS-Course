export const getUserByEmail = async (email) => {

	const userData = {
		user_email: email,
	}
	fetch("api/get-user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log("Got email user:")
			console.log(data);
			return data;
		});
	return null;
}

export const getUserByID = async (id) => {
	const userData = {
		user_id: id,
	}
	fetch("api/get-user", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log("Got ID user:")
			console.log(data);
			return data;
		});
	return null;
}

export const getUserByLogin = async (email, password) => {
	console.log("Getting user by login")
	const userData = {
	  user_email: email,
	  user_password: password
	}
	return fetch("api/get-user", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(userData),
	})
	  .then((res) => res.json())
	  .then((data) => {
		console.log("Got login user:")
		console.log(data);
		return data;
	  });
  }

export const getUsers = async () => {
	fetch("api/get-users")
		.then((res) => res.json())
		.then((data) => {
			console.log("Got all users:")
			console.log(data);
			return data;
		});
	return null;
}