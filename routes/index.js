const express= require('express');
const router= express.Router();
const UserController= require('../controllers/user')
const isUserAuthenticated = require('../middleware/isUserAuthenticated')
const noteController = require('../controllers/note')

//user apis
router.post('/auth/register',UserController.signup)
router.post('/auth/login',UserController.login)


//middleware
router.all('/api/*',isUserAuthenticated)

//note apis
router.post('/api/addnote',noteController.addNote)

module.exports = router;
