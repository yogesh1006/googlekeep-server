const express= require('express');
const router= express.Router();
const UserController= require('../controllers/user')
const isUserAuthenticated = require('../middleware/isUserAuthenticated')
const noteController = require('../controllers/note');
const note = require('../controllers/note');

//user apis
router.post('/auth/register',UserController.signup)
router.post('/auth/login',UserController.login)


//middleware
router.all('/api/*',isUserAuthenticated)

//note apis
router.post('/api/create_note',noteController.createNote)
router.get('/api/get_all_notes',noteController.getAllNotes)
router.delete('/api/delete_note/:note_id',noteController.deleteNote)
router.post('/api/update_note/:note_id',noteController.updateNote)



module.exports = router;
