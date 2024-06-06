import mysql from 'mysql'

export default (req, res) => {
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'cringe',
		database: 'test_schema',
		port: 3306,
		authPlugin: 'mysql_native_password'
	})
	//Base query, conditionals only added if held in req.body
	let query = `SELECT * FROM test_users`
	//If any values are passed, add a WHERE clause
	if (req.body){
		query += ` WHERE `
		//Iterate through each key in req.body
		for (const key in req.body){
			//Add key value pair to the query
			query += `${key} = '${req.body[key]}' AND `
		}
		//Remove the last AND
		query = query.slice(0, -5)
	}
	connection.query(query, (error, results) => {
		if (error) {
		return res.status(500).json({ error })
		}

		res.status(200).json({ users: results })
		connection.end()
	})
}