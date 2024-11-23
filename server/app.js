require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const apiRoute = require('./routes/api');

const app = express();


app.use(passport.initialize());
app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api',apiRoute);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`The server is running on port ${port}`));