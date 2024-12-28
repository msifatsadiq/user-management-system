const mysql = require('mysql2')


    // database connection pool
    const pool = mysql.createPool({
        connectionLimit:100,
        host           :process.env.DB_HOST,
        user           :process.env.DB_USER,
        password       :process.env.DB_PASS,
        database       :process.env.DB_NAME
    });

// View users
exports.view = (req, res) => {
    // Connect to the database
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection failed:', err);
            return res.status(500).send('Database connection failed'); // Send response and exit
        }

        console.log('Connected to DB as ID ' + connection.threadId);

        // Query the database
        connection.query('SELECT * FROM users WHERE status="active" ', (err, rows) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).send('Error fetching users'); // Send response and exit
            }

            console.log('The data from user table:\n', rows);
            
            // Render the view with data
            res.render('home', { rows });
        });
    });
};


