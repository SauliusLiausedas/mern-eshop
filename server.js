const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// BodyParser
app.use(bodyParser.json());
// DB CONFIG
const db = require('./config/keys').mongoURI
// Connect to DB
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((error => console.log('Error: '+ error)))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server successfully started on port ${port}`))


