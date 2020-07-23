const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const Bcrypt = require("bcryptjs");

const app = express();
//connect MongoDB
// connectDB();
const Razorpay = require('razorpay');
const shortid = require('shortid');
const cors = require('cors');


var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/roomydb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//connect MongoDB
// connectDB();

app.get('/', (req, res) => res.send('API running !!!'));

//Middleware for access to req.body

app.use(express.json({ extend: false }));
//payments

//routes
app.use('/api/users', require('./routes/api/users'));

app.use('/api/users_cust', require('./routes/api/users_cust'));


app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/posts', require('./routes/api/posts'));

app.use('/api/rooms', require('./routes/api/rooms'));

app.use('/api/auth', require('./routes/api/auth'));


app.use('/api/auth_cust', require('./routes/api/auth_cust'));

app.use('/api/fg', require('./routes/api/fg'));

app.use('/api/mail_sender', require('./routes/api/mail_sender'));

//const route = require('./routes/api/users');
//app.use('/users', route);

app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: 'rzp_test_fvrtPHrPNkX4EA',
    key_secret: 'BLE1UPO2JDxfDyA8nwTEwrSu',
});
// const razorpay = new Razorpay({
//     key_id: 'rzp_test_RG1vHCHjcNGK8g',
//     key_secret: 'KDaPwiIvgIf2cVknQtfQdcoE',
// });


app.post('/verification', (req,res) =>{
    //do a verification
    const secret = '12345678';
    //const secret = '123456789';
    console.log(req.body);

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    
    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']){
        console.log('request is legit')

        require('fs').writeFileSync('payment5.json', JSON.stringify(req.body, null, 4))
    }else{
        console.log('request is not legit')
    }


    res.json({ status: 'ok' });

})

app.post('/razorpay', async (req, res) => {
    
    const payment_capture = 1;
    const amount = 4999
    const currency = 'INR'

    const options = {
        amount: (amount * 100).toString(), 
        currency, 
        receipt: shortid.generate(), 
        payment_capture
    }
    try{
        const response = await razorpay.orders.create(options)
        console.log('hello server start');
        console.log(response);
        console.log('hello server end');

        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    
    }
    catch(err){
        console.log(err);
    }
})


const PORT = process.env.PORT || 5000; //heroku runs star script in package.json file. The PORT variable in env is also for heroku

app.listen(PORT, () => console.log(`server started at ${PORT}`));
