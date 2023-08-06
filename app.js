const express = require('express');
const app = express();
const db = require('./db');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

const AuthController = require('./Controller/AuthController');
app.use('/api/auth',AuthController);

app.listen(port,() => {
    console.log(`Listing to port ${port}`);
})