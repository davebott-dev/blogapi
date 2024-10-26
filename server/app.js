require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const apiRoute = require('./routes/api');

app.use(express.urlencoded({extended:true}));
app.use('/api',apiRoute);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`The server is running on port ${port}`));