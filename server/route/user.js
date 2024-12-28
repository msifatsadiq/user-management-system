const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// create,find,update,delete
router.get('/',userController.view)
router.post('/',userController.find)
router.get('/adduser',userController.form)
router.post('/adduser',userController.create)
router.get('/edituser/:id',userController.edit)

// Routes
router.get('/', (req, res) => {
    res.render('home'); // Ensure 'views/home.hbs' exists
});

module.exports = router; 