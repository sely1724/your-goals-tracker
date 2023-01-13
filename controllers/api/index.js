const router = require('express').Router();

const userPage = require('./userpage');
const login = require('./login');
const allUsers = require('./allusers');


router.use('/userpage', userPage);
router.use('/login', login);
router.use('/allusers', allUsers);

module.exports = router;