const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const signup = require('./routes/api/user/signup');
const signin = require('./routes/api/user/signin');
const verify = require('./routes/api/user/verify');
const logout = require('./routes/api/user/logout');
const navItem = require('./routes/api/navItem');
const news = require('./routes/api/news');

const app = express();
// CORS exceptions
app.use((req, res, next) => { //doesn't send response just adjusts it
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000'); //* to give access to any origin
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization" //to give access to all the headers provided
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
        return res.status(200).json({});
    }
    next(); //so that other routes can take over
});
// BodyParser
app.use(bodyParser.json());
// DB CONFIG
const db = require('./config/keys').mongoURI;
// Connect to DB
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch((error => console.log('Error: '+ error)));

// All Routes
app.use('/api/items', items);
app.use('/api/user/signup', signup);
app.use('/api/user/signin', signin);
app.use('/api/user/verify', verify);
app.use('/api/user/logout', logout);
app.use('/api/navItem', navItem);
app.use('/api/news', news);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server successfully started on port ${port}`));


