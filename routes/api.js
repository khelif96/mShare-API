/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/apiHome');
const login = require('../controller/login');
const updateUser = require('../controller/updateUser');
const newNote = require('../controller/newNote');
const getNotes = require('../controller/getNotes');

// const getUser = require('../controller/getUser');

// API
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

router.post('/registerUser', login.registerUser);

router.get('/loginUser', login.getLoginUser);
router.post('/loginUser', login.loginUser);

router.put('/updateUser', updateUser.updateUser);

router.post('/newNote', newNote.createTextNote);

router.post('/newImageNote', newNote.createImageNote);

router.post('/getNotes', getNotes.getNotes);

// Return router
module.exports = router;
