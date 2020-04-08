const express = require('express');
const bodyParser = require('body-parser');

// const connectDB = require('./config/db');
const Bcrypt = require("bcryptjs");

const app = express();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/roomydb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

//connect MongoDB
// connectDB();

app.get('/', (req, res) => res.send('API running !!!'));

//Middleware for access to req.body

app.use(express.json({ extend: false }));


//routes
app.use('/api/users', require('./routes/api/users'));

app.use('/api/users_cust', require('./routes/api/users'));


app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/rooms', require('./routes/api/rooms'));

app.use('/api/auth', require('./routes/api/auth'));


app.use('/api/auth_cust', require('./routes/api/auth_cust'));

app.use('/api/fg', require('./routes/api/fg'));

app.use('/api/mail_sender', require('./routes/api/mail_sender'));

//const route = require('./routes/api/users');
//app.use('/users', route);

const PORT = process.env.PORT || 5000; //heroku runs star script in package.json file. The PORT variable in env is also for heroku

app.listen(PORT, () => console.log(`server started at ${PORT}`));
