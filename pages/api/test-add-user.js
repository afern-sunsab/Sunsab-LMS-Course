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
	const { user_id, user_email, user_password } = req.body
	const query = `INSERT INTO test_users (user_id, user_email, user_password) VALUES (${user_id}, '${user_email}', '${user_password}')`
	connection.query(query, (error, results) => {
		if (error) {
		return res.status(500).json({ error })
		}

		res.status(200).json({ message: 'User added successfully' });
		connection.end()
	})
}