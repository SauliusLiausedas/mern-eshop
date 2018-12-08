const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const signup = require('./routes/api/user/signup');
const signin = require('./routes/api/user/signin');
const verify = require('./routes/api/user/verify');
const logout = require('./routes/api/user/logout');

const app = express();
// BodyParser
app.use(bodyParser.json());
// DB CONFIG
const db = require('./config/keys').mongoURI
// Connect to DB
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((error => console.log('Error: '+ error)))

app.use('/api/items', items);
app.use('/api/user/signup', signup);
app.use('/api/user/signin', signin);
app.use('/api/user/verify', verify);
app.use('/api/user/logout', logout);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server successfully started on port ${port}`))


