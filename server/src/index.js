const express = require('express');
const mongoose = require('mongoose');
const rout = require('./router/rout');
const cors = require('cors');

//----------------------DB URL
const URL = 'mongodb+srv://sourabh:sourabh@cluster0.vvdx1ge.mongodb.net/test';

const app = express();

//----------------------middleware
app.use(express.json());
app.use(cors());

//-------------------------------DB connect
mongoose.connect(URL).then(_ => console.log('connect DB')).catch(err => console.log(err));

app.use('/', rout);

app.listen(process.env.PORT || 1234, () => console.log(`server is runing on 1234`));