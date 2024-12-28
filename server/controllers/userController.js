const mysql = require("mysql2");

// database connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// View users
exports.view = (req, res) => {
  // Connect to the database
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err);
      return res.status(500).send("Database connection failed"); // Send response and exit
    }
    console.log("Connected to DB as ID " + connection.threadId);
    // Query the database
    connection.query(
      'SELECT * FROM users WHERE status="active" ',
      (err, rows) => {
        // Release the connection back to the pool
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).send("Error fetching users"); // Send response and exit
        }
        console.log("The data from user table:\n", rows);
        // Render the view with data
        res.render("home", { rows });
      }
    );
  });
};

// find user by search start---------------------------------------------------------------
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err);
      return res.status(500).send("Database connection failed"); // Send response and exit
    }
    console.log("Connected to DB as ID " + connection.threadId);
    // get the data from the form
    let searchItem = req.body.search;
    // Query the database
    connection.query(
      "SELECT * FROM users WHERE first_name LIKE? OR last_name LIKE? ",
      ["%" + searchItem + "%", "%" + searchItem + "%"],
      (err, rows) => {
        // Release the connection back to the pool
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).send("Error fetching users"); // Send response and exit
        }
        console.log("The data from user table:\n", rows);
        // Render the view with data
        res.render("home", { rows });
      }
    );
  });
};
// find user by search end---------------------------------------------------------------

exports.form = (req, res) => {
  res.render("addUser");
};

// Add new user start---------------------------------------------------------------
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err);
      return res.status(500).send("Database connection failed"); // Send response and exit
    }
    console.log("Connected to DB as ID " + connection.threadId);
    // get the data from the form
    let searchItem = req.body.search;
    // Query the database
    connection.query(
      "INSERT INTO users SET first_name = ?,last_name = ?, email = ?, phone = ?, comments = ? ",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        // Release the connection back to the pool
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).send("Error fetching users"); // Send response and exit
        }
        console.log("The data from user table:\n", rows);
        // Render the view with data
        res.render("addUser",{alert: 'User Added Successfully'});
      }
    );
  });
};

// edit user

exports.edit = (req, res) => {
//    res.render('editUser')

   pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err);
      return res.status(500).send("Database connection failed"); // Send response and exit
    }
    console.log("Connected to DB as ID " + connection.threadId);
    // get the data from the form
    let searchItem = req.body.search;
    // Query the database
    connection.query(
      "SELECT * FROM users WHERE id = ? ",
      [req.params.id],
      (err, rows) => {
        // Release the connection back to the pool
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).send("Error fetching users"); // Send response and exit
        }
        console.log("The data from user table:\n", rows);
        // Render the view with data
        res.render("editUser", { rows });
      }
    );
  });
  };
// update user

exports.update = (req, res) => {
const { first_name, last_name, email, phone, comments } = req.body;


   pool.getConnection((err, connection) => {
    if (err) {
      console.error("Database connection failed:", err);
      return res.status(500).send("Database connection failed"); // Send response and exit
    }
    console.log("Connected to DB as ID " + connection.threadId);
    // get the data from the form
    let searchItem = req.body.search;
    // Query the database
    connection.query(
      "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?",
      [first_name,last_name,req.params.id],
      (err, rows) => {
        // Release the connection back to the pool
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).send("Error fetching users"); // Send response and exit
        }
        console.log("The data from user table:\n", rows);
        // Render the view with data
        

        pool.getConnection((err, connection) => {
          if (err) {
            console.error("Database connection failed:", err);
            return res.status(500).send("Database connection failed"); // Send response and exit
          }
          console.log("Connected to DB as ID " + connection.threadId);
          // get the data from the form
          let searchItem = req.body.search;
          // Query the database
          connection.query(
            "SELECT * FROM users WHERE id = ? ",
            [req.params.id],
            (err, rows) => {
              // Release the connection back to the pool
              connection.release();
              if (err) {
                console.error("Error executing query:", err);
                return res.status(500).send("Error fetching users"); // Send response and exit
              }
              console.log("The data from user table:\n", rows);
              // Render the view with data
              res.render("editUser", { rows ,alert:`${first_name} has been updated`});
            }
          );
        });



      }
    );
  });
  };



  // delete user

exports.delete = (req, res) => {
  //    res.render('editUser')
  
     pool.getConnection((err, connection) => {
      if (err) {
        console.error("Database connection failed:", err);
        return res.status(500).send("Database connection failed"); // Send response and exit
      }
      console.log("Connected to DB as ID " + connection.threadId);
      // Query the database
      connection.query(
        "DELETE FROM users WHERE id = ? ",
        [req.params.id],
        (err, rows) => {
          // Release the connection back to the pool
          connection.release();
          if (err) {
            console.error("Error executing query:", err);
            return res.status(500).send("Error fetching users"); // Send response and exit
          }
          console.log("The data from user table:\n", rows);
          // Render the view with data
          // res.render("home", { rows });
          res.redirect('/')
        }
      );
    });
    };