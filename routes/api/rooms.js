const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const Rooms = require("../../models/Rooms");
const Preferences = require("../../models/Preferences");
const User = require("../../models/User");
const Occupant = require("../../models/Occupants");
const auth = require("../../middleware/auth");
const RateOccupantsAndRoom = require("../../models/RateOccupantsAndRoom");
const Complains = require("../../models/Complains");
const Occupants = require("../../models/Occupants");
const UserReview = require("../../models/UserReview");
const RoomReview = require("../../models/RoomReview");


router.get("/list", auth,async (req, res) => {
    let user = await User.findOne({_id:req.user.id});
    if(user && user.isOwner){
        let rooms = await Rooms.find({ user: req.user.id }).select(["-user"]);
        res.json(rooms);
    }else{
        let preferences = await Preferences.findOne({ user: req.user.id})
        
        let form_data = {}

        if (preferences.earlybird) {
            form_data.earlybird = { "$in": [preferences.earlybird, "Not sure"] }
        }
    

        if (preferences.smoker) {
            form_data.smoker = { "$in": [preferences.smoker, "Not sure"] }
        }

        if (preferences.nightowl) {
            form_data.nightowl = { "$in": [preferences.nightowl, "Not sure"] }
        } 

        if (preferences.gender) {
            form_data.gender = { "$in": [preferences.gender, "Not sure"] }
        }

        if (preferences.rent > 0) {
            form_data.rent = { "$lte": preferences.rent }
        }

        if (preferences.pincode) {
            form_data.pincode = preferences.pincode
        }

        if (preferences.city) {
            form_data.city = preferences.city
        }

        if (preferences.pets) {
            form_data.pets = preferences.pets;
        }

        if (preferences.vegetarians) {
            form_data.vegetarians = { "$in": [preferences.vegetarians, "Not sure"] }
        } 

        if (preferences.furnished) {
            form_data.furnished = preferences.furnished;
        }

        if (preferences.wifi) {
            form_data.wifi = preferences.wifi;
        } 

        if (preferences.parking) {
            form_data.parking = preferences.parking;
        }

        person_details = [];
        tenants = await Occupant.findOne({ user: req.user.id });
        // for (var i = 0; i < tenants.length; i++) {
        //     person_details.push(tenants[i].room);
        // }
        if(tenants){
            form_data._id = { "$nin": tenants.room }
        }
        

        console.log("Form data",form_data);

        let rooms = await Rooms.find(form_data).limit(10).select(["-user"]);
        rooms.user = user.name;
        console.log("Length of rooms",rooms.length);
        
        res.json({"rooms":rooms,"preferences":preferences});
    }
    res.status(400).json({error:"User is not authorized"});
});

router.get("/ownerRoom/:id", auth, async (req,res) => {
    var user = await User.findOne({ _id: req.user.id });
    person_details = []
    if(user && user.isOwner){
        var room = await Rooms.findOne({ user: req.user.id, _id: req.params.id });
        var details = room.toJSON();
        details.interested_people = await User.find({ _id: { "$in": room.interested_people } }).select(["name", "email", "-_id"]);
        tenants = await Occupant.find({room: room._id}).select(["-room","-_id"]);
        for(var i=0; i<tenants.length; i++){
            person_details.push(tenants[i].user);
        }
        details.occupants = await User.find({ _id: { "$in": person_details } }).select(["name", "email", "-_id"]);
        // console.log(details);
        res.json(details);
    }
    res.status(400).json({ error: "User is not authorized" });
});


router.get("/getRoomDetails/:id", auth, async (req, res) => {
    var user = await User.findOne({ _id: req.user.id });
    
    if (user && user.isOwner) {
        var room = await Rooms.findOne({ user: req.user.id, _id: req.params.id });
        // console.log(room);
        res.json(room);
    }
    res.status(400).json({ error: "User is not authorized" });
});

router.post("/filters", auth, async (req,res) => {
    console.log(req.body);
    try{
    let rooms = await Rooms.find(req.body);
    res.json(rooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: "unable to fetch"});
    }
});



router.get("/userviewRoom/:id", auth, async (req, res) => {
        let room = await Rooms.findOne({ _id: req.params.id });
        var details = room.toJSON();
        details.interested_people = await User.find({ _id: { "$in": room.interested_people } }).select(["name", "email", "-_id"])

        person_details = [];
        tenants = await Occupant.find({ room: room._id }).select(["-room", "-_id"]);
        for (var i = 0; i < tenants.length; i++) {
            person_details.push(tenants[i].user);
        }
        details.occupants = await User.find({ _id: { "$in": person_details } }).select(["name", "email", "-_id"]);
        // console.log(details);
        res.json(details);    
});


router.get("/userRoom", auth, async (req, res) => {
    let occupant = await Occupant.findOne({user: req.user.id});
    if(occupant){
        let room = await Rooms.findOne({ _id: occupant.room });
        var details = room.toJSON();
        details.interested_people = [];

        person_details = [];
        tenants = await Occupant.find({ room: room._id }).select(["-room", "-_id"]);
        for (var i = 0; i < tenants.length; i++) {
            person_details.push(tenants[i].user);
        }
        details.occupants = await User.find({ _id: { "$in": person_details } }).select(["name", "email", "-_id"]);
        // console.log(details);
        res.json(details);
    }
    
    else{
        res.json({ "msg":"Your are currently not associated with any room"});
    }
    
});

router.get("/markInterested/:id", auth, async (req, res) => {
    let room = await Rooms.findOne({ _id: req.params.id });
    room.interested_people.push(req.user.id);
    room.save();
    var details = room.toJSON();
    details.interested_people = await User.find({ _id: { "$in": room.interested_people } }).select(["name", "email", "-_id"])
    
    person_details = [];
    tenants = await Occupant.find({ room: room._id }).select(["-room", "-_id"]);
    for (var i = 0; i < tenants.length; i++) {
        person_details.push(tenants[i].user);
    }
    details.occupants = await User.find({ _id: { "$in": person_details } }).select(["name", "email", "-_id"]);
    // console.log(details);
    res.json(details);

});

router.post('/addUser', auth, async(req, res) => {
    const email = req.body.email;
    const room_id = req.body.room;
    let user = await User.findOne({email:email });
    const instance = await Occupant.findOne({ user: user.id })
    let room = await Rooms.findOne({ _id: room_id });
    if (room.availability > 0){
        if(!instance){ 
            const occupant = new Occupant({user:user.id, room:room_id});
            await occupant.save();
        }    
        
        for (var i = 0; i < room.interested_people.length; i++) {

            if (room.interested_people[i] == user.id) {
                room.interested_people.splice(i, 1);
            }
        }
        room.availability = room.availability - 1;
        await room.save();
    }
    var details = room.toJSON();
    person_details = [];
    tenants = await Occupant.find({ room: room._id }).select(["-room", "-_id"]);
    for (var i = 0; i < tenants.length; i++) {
        person_details.push(tenants[i].user);
    }
    details.occupants = await User.find({ _id: { "$in": person_details } }).select(["name", "email", "-_id"]);
    details.interested_people = await User.find({ _id: { "$in": room.interested_people } }).select(["name", "email", "-_id"])
    res.json(details);
    
 });

router.post('/removeUser', auth, async (req, res) => {
    const email = req.body.email;
    // const room_id = req.body.room;

    let review_data = {}

    if (req.body.smoker) {
        review_data.smoker = req.body.smoker
    }

    if (req.body.earlybird) {
        review_data.earlybird = req.body.earlybird
    }

    if (req.body.nightowl) {
        review_data.nightowl = req.body.nightowl
    }

    if (req.body.pets) {
        review_data.pets = req.body.pets
    }

    if (req.body.vegetarians) {
        review_data.vegetarians = req.body.vegetarians
    }

    if (req.body.review_text) {
        review_data.review_text = req.body.review_text
    }

    let user = await User.findOne({ email: email });
    const instance = await Occupant.findOne({ user: user._id })
    let room = await Rooms.findOne({ _id: instance.room });

    if (review_data != {}) {
        review_data.user = req.user.id;
        review_data.occupant = user._id;
        let review = new UserReview(review_data);
        await review.save();
    }
    await instance.deleteOne();
    room.availability = room.availability + 1;
    let occupant = await Occupant.find({room:room._id});
    let occupant_data = [];
    for (var i = 0; i < occupant.length; i++){
        occupant_data.push(occupant[i].user);
    }
    let rate_occupants_room = new RateOccupantsAndRoom({user:user._id,room:room._id,occupants:occupant_data});
    await rate_occupants_room.save();
    await room.save();
    res.json("OKAY");   

});

router.post('/submitUserReview', auth, async (req, res) => {
    const name = req.body.name;
    // const room_id = req.body.room;

    let review_data = {}

    if (req.body.smoker) {
        review_data.smoker = req.body.smoker
    }

    if (req.body.earlybird) {
        review_data.earlybird = req.body.earlybird
    }

    if (req.body.nightowl) {
        review_data.nightowl = req.body.nightowl
    }

    if (req.body.pets) {
        review_data.pets = req.body.pets
    }

    if (req.body.vegetarians) {
        review_data.vegetarians = req.body.vegetarians
    }

    if (req.body.review_text) {
        review_data.review_text = req.body.review_text
    }

    let occupant = await User.findOne({ name: name });

    if (review_data != {}) {
        review_data.user = req.user.id;
        review_data.occupant = occupant._id;
        let temp = await UserReview.findOne({user:req.user.id,occupant:occupant._id});
        if(temp){
            await temp.deleteOne();
        } 
        let review = new UserReview(review_data);
        await review.save();
    }
    res.json("OKAY");

});

router.post('/reviewRoomMate', auth, async (req, res) => {
    const name = req.body.name;
    // const room_id = req.body.room;
    let occupant = await User.findOne({name:name});
    let review = await UserReview.findOne({ user: req.user.id, occupant:occupant._id});
    let review_data = {}

    if (review.smoker) {
        review_data.smoker = review.smoker
    }

    if (review.earlybird) {
        review_data.earlybird = review.earlybird
    }

    if (review.nightowl) {
        review_data.nightowl = review.nightowl
    }

    if (review.pets) {
        review_data.pets = review.pets
    }

    if (review.vegetarians) {
        review_data.vegetarians = review.vegetarians
    }

    if (review.review_text) {
        review_data.review_text = review.review_text
    }

    res.json(review_data);

});



router.get('/listPastRoomDetails',auth, async (req,res) => {
    try{
        let rate_occupants_room = await RateOccupantsAndRoom.findOne({user:req.user.id});
        let form_data = {};
        if(rate_occupants_room){
            form_data.occupants = await User.find({ _id: { "$in": rate_occupants_room.occupants}}).select(["name"]);
        }
        let roomreview = await RoomReview.findOne({room:rate_occupants_room.room,user:req.user.id});
        if(roomreview){
            form_data.roomreview = roomreview;
        }
        res.json(form_data);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "server error" });
    }
});




router.post('/reviewRoom', auth, async (req, res) => {

    let review_data = {}

    if (req.body.furnished) {
        review_data.furnished = req.body.furnished
    }

    if (req.body.wifi) {
        review_data.wifi = req.body.wifi
    }

    if (req.body.parking) {
        review_data.parking = req.body.parking
    }

    if (req.body.owner) {
        review_data.owner = req.body.owner
    }

    if (req.body.review_text) {
        review_data.review_text = req.body.review_text
    }

    if (req.body.review_text) {
        review_data.review_text = req.body.review_text
    }

    const instance = await RateOccupantsAndRoom.findOne({ user: req.user.id })

    if (review_data != {}) {
        review_data.user = req.user.id;
        review_data.room = instance.room;
        let review = new RoomReview(review_data);
        await review.save();
    }
    
    res.json("OKAY");

});

router.get("/markUnInterested/:id", auth, async (req, res) => {
    let room = await Rooms.findOne({ _id: req.params.id });
    for (var i = 0; i < room.interested_people.length; i++){
        if (room.interested_people[i] == req.user.id) {
            room.interested_people.splice(i, 1);
        }
    }
    room.save();
    var details = room.toJSON();
    details.interested_people = await User.find({ _id: { "$in": room.interested_people } }).select(["name", "email", "-_id"])

    person_details = [];
    tenants = await Occupant.find({ room: room._id }).select(["-room", "-_id"]);
    for (var i = 0; i < tenants.length; i++) {
        person_details.push(tenants[i].user);
    }
    details.occupants = await User.find({ _id: { "$in": person_details } }).select(["name", "email", "-_id"]);

    // console.log(details);
    res.json(details);

});


router.post("/filters", auth, async (req, res) => {
    console.log(req.body);
    try {
        let preferences = await Preferences.findOne({user:req.user.id});
        if(preferences){
            await preferences.deleteOne();
        }
        let form_data = { user: req.user.id }
        if (req.body.earlybird) {
            form_data.earlybird = req.body.earlybird;
        }

        if (req.body.smoker) {
            form_data.smoker = req.body.smoker;
        } 

        if (req.body.nightowl) {
            form_data.nightowl = req.body.nightowl;
        } 
        if (req.body.gender) {
            form_data.gender = req.body.gender;
        }

        if (req.body.rent > 0) {
            form_data.rent = req.body.rent;
        }

        if (req.body.pincode) {
            form_data.pincode = req.body.pincode;
        }

        if (req.body.city) {
            form_data.city = req.body.city;
        }

        if (req.body.pets) {
            form_data.pets = req.body.pets;
        }

        if (req.body.vegetarians) {
            form_data.vegetarians = req.body.vegetarians;
        } 

        if (req.body.furnished) {
            form_data.furnished = req.body.furnished;
        }

        if (req.body.wifi) {
            form_data.wifi = req.body.wifi;
        }

        if (req.body.parking) {
            form_data.parking = req.body.parking;
        }
        let newPreferences = new Preferences(form_data);
        newPreferences.save();
        console.log(req.body);
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "unable to fetch" });
    }
});

router.post("/submitComplain", auth, async (req, res) =>{
    try{
        let occupant = await Occupants.findOne({ user: req.user.id });
        let room = await Rooms.findOne({ _id: occupant.room });
        let complain = new Complains({ user: req.user.id, owner: room.user, complain: req.body.complain, room: occupant.room });
        await complain.save();
        res.json("Done")
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ msg: "unable to fetch" });
    }
    
});

router.get("/listUserComplain", auth, async (req, res) => {
    try{
        let occupant = await Occupants.findOne({ user: req.user.id });
        let complains = await Complains.find({user:req.user.id,room:occupant.room});
        res.json(complains);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "unable to fetch" });
    }
});

router.get("/RentHistory", auth, async (req, res) => {
    try {
        let payments = await Rent.find({user:req.user.id}).sort({transaction_date:-1});
        res.json(payments);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "unable to fetch" });
    }
});

router.get("/listOwnerComplain/:id", auth, async (req, res) => {
    try {
        // console.log(req.params.id);
        let complains = await Complains.find({ room: req.params.id,status:"open" });
        // console.log("complains are",complains);
        let details = [];
        for(var i = 0; i < complains.length; i++){
            details.push(complains[i].toJSON());
            details[i].user = await User.findOne({_id:complains[i].user}).select(['name','email']);
            // console.log("user",details[i].user);
        }
        console.log(details);
        res.json(details);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "unable to fetch" });
    }
});

router.get("/updateComplain/:id", auth, async (req, res) => {
    try {
        let complains = await Complains.findOne({ _id: req.params.id});
        complains.status = "closed";
        await complains.save();
        res.json("Done");
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "unable to fetch" });
    }
});



router.post(
    "/create",
    [
        auth,
        [
            check("name", "name is needed").not().isEmpty(),
            check("address", "address is needed").not().isEmpty(),
            check("city", "City is needed").not().isEmpty(),
            check("state", "State is needed").not().isEmpty(),
            check("pincode", "Invalid pincode").isLength({ min: 6, max: 6 }),
            check("phonenum", "Invalid phone Number").isLength({ min: 10, max: 10 }),
            check("availability", "Invalid number").isNumeric(),
            check("sq_ft", "Invalid number").isNumeric(),
            check("rent", "Invalid rent").isDecimal(),
            check("smoker", "Invalid option for smoker").isIn(["Yes", "No", "Not sure"]),
            check("nightowl", "Invalid option for night-owl").isIn(["Yes", "No", "Not sure"]),
            check("earlybird", "Invalid option for early bird").isIn(["Yes", "No", "Not sure"]),
            check("pets", "Inavlid option for pets").isIn(["Dogs", "Cats", "Birds", "Others","No Pets","Not sure"]),
            check("vegetarians", "Invalid option for vegetarian").isIn(["Yes", "No", "Not sure"]),
            check("furnished", "Invalid option for furnished").isIn(["Fully", "Semi", "Not Furnished"]),
            check("wifi", "Invalid option for wifi").isIn(["Yes", "No"]),
            check("parking", "Invalid option for parking").isIn(["Four Wheeler", "Two Wheeler", "Both", "No parking"]),
            check("gender", "Invalid option for gender").isIn(["Male", "Female", "Not sure"]),
            check("trial", "Invalid option for trial").isIn(["Yes", "No"]),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }

        try {
            console.log(req.body);
            const roomdetails = {
                user: req.user.id,
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                sq_ft:req.body.sq_ft,
                pincode: parseInt(req.body.pincode, 10),
                state: req.body.state,
                phonenum: parseInt(req.body.phonenum, 10),
                availability: req.body.availability,
                rent: req.body.rent,
                smoker: req.body.smoker,
                nightowl: req.body.nightowl,
                earlybird: req.body.earlybird,
                pets: req.body.pets,
                vegetarians: req.body.vegetarians,
                furnished: req.body.furnished,
                wifi: req.body.wifi,
                parking: req.body.parking,
                gender:req.body.gender,
                trial:req.body.trial
            };
            const room = new Rooms(roomdetails);
            await room.save();
            res.json(room);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg: "server error"});
        }
    }
);


router.post(
    "/updateRoom",
    [
        auth,
        [
            check("name", "name is needed").not().isEmpty(),
            check("address", "address is needed").not().isEmpty(),
            check("city", "City is needed").not().isEmpty(),
            check("state", "State is needed").not().isEmpty(),
            check("pincode", "Invalid pincode").isLength({ min: 6, max: 6 }),
            check("phonenum", "Invalid phone Number").isLength({ min: 10, max: 10 }),
            check("availability", "Invalid number").isNumeric(),
            check("sq_ft", "Invalid number").isNumeric(),
            check("rent", "Invalid rent").isDecimal(),
            check("smoker", "Invalid option for smoker").isIn(["Yes", "No", "Not sure"]),
            check("nightowl", "Invalid option for night-owl").isIn(["Yes", "No", "Not sure"]),
            check("earlybird", "Invalid option for early bird").isIn(["Yes", "No", "Not sure"]),
            check("pets", "Inavlid option for pets").isIn(["Dogs", "Cats", "Birds", "Others", "No Pets", "Not sure"]),
            check("vegetarians", "Invalid option for vegetarian").isIn(["Yes", "No", "Not sure"]),
            check("furnished", "Invalid option for furnished").isIn(["Fully", "Semi", "Not Furnished"]),
            check("wifi", "Invalid option for wifi").isIn(["Yes", "No"]),
            check("parking", "Invalid option for parking").isIn(["Four Wheeler", "Two Wheeler", "Both", "No parking"]),
            check("gender", "Invalid option for gender").isIn(["Male", "Female", "Not sure"]),
            check("trial", "Invalid option for trial").isIn(["Yes", "No"]),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        try {
            console.log(req.body);
            let room = await Rooms.findOne({_id:req.body.room_id});
            const roomdetails = {
                user: req.user.id,
                name: req.body.form_data.name,
                address: req.body.form_data.address,
                city: req.body.form_data.city,
                sq_ft: req.body.form_data.sq_ft,
                pincode: parseInt(req.body.form_data.pincode, 10),
                state: req.body.form_data.state,
                phonenum: parseInt(req.body.form_data.phonenum, 10),
                availability: req.body.form_data.availability,
                rent: req.body.form_data.rent,
                smoker: req.body.form_data.smoker,
                nightowl: req.body.form_data.nightowl,
                earlybird: req.body.form_data.earlybird,
                pets: req.body.form_data.pets,
                vegetarians: req.body.form_data.vegetarians,
                furnished: req.body.form_data.furnished,
                wifi: req.body.form_data.wifi,
                parking: req.body.form_data.parking,
                gender: req.body.form_data.gender,
                trial: req.body.form_data.trial
            };

            await room.update(roomdetails);

            // const room = new Rooms(roomdetails);

            // let upsertData = room.toObject();
            // delete upsertData._id;
            // room.update({ _id: req.body.room_id }, upsertData);
            
            res.json("room details updated!");
        
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "server error" });
        }
    }
);


module.exports = router;