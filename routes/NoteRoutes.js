const express = require('express');
const router = express.Router();
const noteController = require('../controllers/NoteController');
const authCheck = require('../middleware/authcheck');


router.post('/create', authCheck.authCheck, noteController.create)
    .get('/get-notes', authCheck.authCheck, noteController.getAllNotes)
    .get('/get-note/:id', authCheck.authCheck, noteController.getNote)
    .put('/update/:id', authCheck.authCheck, noteController.updateNote)
    .delete('/delete/:id', authCheck.authCheck, noteController.deleteNote)

module.exports = router;