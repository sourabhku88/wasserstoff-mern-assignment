const express = require('express');
const { createStudent, addTopic, getstudent } = require('../controller/student');


const router = express.Router();

//------------------------API's
router.post('/create/student', createStudent);
router.put('/addtopic/:studentName', addTopic);
router.get('/getstudent/:studentName', getstudent);

module.exports = router;