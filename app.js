const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware for parsing requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static files
app.use(express.static('public'));

// Templating engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');






const route = require('./server/route/user')
app.use('/',route);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => console.log(`Listening on port: ${port}`));
