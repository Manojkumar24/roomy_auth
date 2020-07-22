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
        console.log("Lenght of rooms",rooms.length);
        
        res.json(rooms);
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
    const room_id = req.body.room;
    let user = await User.findOne({ email: email });
    const instance = await Occupant.findOne({ user: user.id })
    await instance.deleteOne();
    let room = await Rooms.findOne({ _id: room_id });
    room.availability = room.availability + 1;
    await room.save();

    person_details = [];
    tenants = await Occupant.find({ room: room._id }).select(["-room", "-_id"]);
    for (var i = 0; i < tenants.length; i++) {
        person_details.push(tenants[i].user);
    }
    console.log(person_details);
    let rateoccupants = await RateOccupantsAndRoom.findOne({user:user.id})
    if(rateoccupants){
        await rateoccupants.deleteOne();
    }
    let oldRoom = await RateOccupantsAndRoom({ user: user.id, room: room_id, occupants: person_details });
    await oldRoom.save();
    details.occupants = await User.find({ _id: { "$in": person_details } }).select(["name", "email", "-_id"]);
    details.interested_people = await User.find({ _id: { "$in": room.interested_people } }).select(["name", "email", "-_id"])
    res.json(details);

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
        let preferences = await Preferences({user:req.user.id});
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
            check("gender", "Invalid option for gender").isIn(["Male", "Female", "Not sure"])
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
                phonnenum: parseInt(req.body.phonnenum, 10),
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
                gender:req.body.gender
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


module.exports = router;