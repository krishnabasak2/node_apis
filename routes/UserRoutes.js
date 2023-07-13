const express = require('express');
const {body, validetor} = require('express-validator');
const router = express.Router();
const User = require('../controllers/UserController');
const authcheck = require('../middleware/authcheck');


router.get('/', User.allUsers)
    .post('/create', User.create)
    .post('/login', User.login)
    .get('/user',authcheck.authCheck, User.authUser)

    
module.exports = router;