const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const Rooms = require("../../models/Rooms");
const User = require("../../models/User");
const auth = require("../../middleware/auth");


router.get("/list", auth,async (req, res) => {
    let user = await User.findOne({_id:req.user.id});
    if(user && user.isOwner){
        let rooms = await Rooms.find({ user: req.user.id }).select(["-user"]);
        res.json(rooms);
    }else{
        let rooms = await Rooms.find().limit(10).select(["-user"]);
        rooms.user = user.name;
        console.log(rooms);
        
        res.json(rooms);
    }
    res.status(400).json({error:"User is not authorized"});
});

router.get("/ownerRoom/:id", auth, async (req,res) => {
    let user = await User.findOne({ _id: req.user.id });
    if(user && user.isOwner){
        let room = await Rooms.find({ user: req.user.id, _id:req.params.id });
        console.log(room);
        res.json(room);
    }
    res.status(400).json({ error: "User is not authorized" });
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