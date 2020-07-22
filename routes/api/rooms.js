const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const Rooms = require("../../models/Rooms");
const User = require("../../models/User");
const Occupant = require("../../models/Occupants");
const auth = require("../../middleware/auth");
const RateOccupantsAndRoom = require("../../models/RateOccupantsAndRoom");


router.get("/list", auth,async (req, res) => {
    let user = await User.findOne({_id:req.user.id});
    if(user && user.isOwner){
        let rooms = await Rooms.find({ user: req.user.id }).select(["-user"]);
        res.json(rooms);
    }else{
        person_details = [];
        tenants = await Occupant.find({ user: req.user.id });
        for (var i = 0; i < tenants.length; i++) {
            person_details.push(tenants[i].room);
        }
        let rooms = await Rooms.find({_id:{"$nin":person_details}}).limit(10).select(["-user"]);
        rooms.user = user.name;
        // console.log(rooms);
        
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
        let rooms = await Rooms.find(req.body);
        res.json(rooms);
    } catch (err) {
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
            check("parking", "Invalid option for parking").isIn(["Four Wheeler", "Two Wheeler", "Both", "No parking"])
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
                parking: req.body.parking
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