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



var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');


var mongoose = require('mongoose');
const auth = require('./middleware/auth');
var mongoDB = 'mongodb://localhost:27017/roomydb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Occupants = require("./models/Occupants");
const Rent = require("./models/Rent");
const Rooms = require("./models/Rooms");


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


app.post('/verification', async (req,res) =>{
    //do a verification
    const secret = '12345678';
    //const secret = '123456789';
    // console.log(req.body);
    let occupant = await Occupants.findOne({ user: localStorage.getItem("user_id") });
    localStorage.removeItem("user_id");
    let room = await Rooms.findOne({ _id: occupant.room });
    
	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    
    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']){
        console.log('request is legit')
        let rent = new Rent({
            user: occupant.user,
            room: room._id,
            payment_id:req.body.payload.payment.entity.id,
            amount: req.body.payload.payment.entity.amount/100,
            order_id:req.body.payload.payment.entity.order_id,
            transaction_method: req.body.payload.payment.entity.method
            })
        
        await rent.save();
        occupant.rent_due_date = Date.now();
        await occupant.save();
        console.log("Done with rent creation");
        // let occupant = await Occupants.findOne({ user: req.user.id });
        // let room = await Rooms.findOne({ _id: occupant.room });
        
        require('fs').writeFileSync('payment6.json', JSON.stringify(req.body, null, 4))
    }else{
        console.log('request is not legit')
    }


    res.json({ status: 'ok' });

})

app.post('/razorpay', auth, async (req, res) => {
    console.log("inside razor pay fn");
    let occupant = await Occupants.findOne({user:req.user.id});
    localStorage.setItem("user_id", req.user.id);
    let room = await Rooms.findOne({_id:occupant.room});
    let user = await User.findOne({_id:req.user.id});

    const payment_capture = 1;
    const amount = room.rent;
    const currency = 'INR'

    const options = {
        amount: (amount * 100).toString(), 
        currency, 
        receipt: shortid.generate(), 
        payment_capture
    }
    try{
        const response = await razorpay.orders.create(options)
        // console.log('hello server start');
        // console.log(response);
        // console.log('hello server end');

        let profile = await Profile.findOne({user:req.user.id});

        let res_data = {
            id: response.id,
            currency: response.currency,
            amount: response.amount,
            name: user.name,
            email: user.email
        }
    
        if (profile.phonenum){
            res_data.contact_number = profile.phonenum;
        }
        res.json(res_data);
    }
    catch(err){
        console.log(err);
    }
})


const PORT = process.env.PORT || 5000; //heroku runs star script in package.json file. The PORT variable in env is also for heroku

app.listen(PORT, () => console.log(`server started at ${PORT}`));
