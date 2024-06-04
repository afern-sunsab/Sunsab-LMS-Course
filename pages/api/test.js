import mysql from 'mysql'

export default (req, res) => {
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'cringe',
		database: 'test_schema',
		port: 3306,
		authPlugin: 'caching_sha2_password'
	})
	connection.query('SELECT * FROM test_table', (error, results) => {
		if (error) {
		return res.status(500).json({ error })
		}

		res.status(200).json({ users: results })
		connection.end()
	})
}