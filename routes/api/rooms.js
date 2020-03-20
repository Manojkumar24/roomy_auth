const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const Rooms = require("../../models/Rooms");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

router.post(
    "/create",
    [
        auth,
        [
            check("name", "name is needed").not().isEmpty(),
            check("address", "address is needed").not().isEmpty(),
            check("city", "City is needed").not().isEmpty(),
            check("state", "State is needed").not().isEmpty(),
            check("pincode", "Invalid pincode").isLength({min: 6, max: 6}),
            check("phonenum", "Invalid phone Number").isLength({min: 10, max: 10}),
            check("availability", "Invalid number").isNumeric(),
            check("rent", "Invalid rent").isDecimal(),
            check("smoker", "Invalid option for smoker").isIn(["YES", "NO", "NOT SURE"]),
            check("nightowl", "Invalid option for night-owl").isIn(["YES", "NO", "NOT SURE"]),
            check("earlybird", "Invalid option for early bird").isIn(["YES", "NO", "NOT SURE"]),
            check("pets", "Inavlid option for pets").isIn(["DOGS", "CATS", "BIRDS", "OTHERS", "NOT SURE"]),
            check("vegetarians", "Invalid option for vegetarian").isIn(["YES", "NO", "NOT SURE"]),
            check("furnished", "Invalid option for furnished").isIn(["FULLY", "SEMI", "NOT"]),
            check("wifi", "Invalid option for wifi").isIn(["YES", "NO"]),
            check("parking", "Invalid option for parking").isIn(["FOUR WHEELER", "TWO WHEELER", "BOTH", "NONE"])
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }

        try {
            const user = await User.findById(req.user.id).select("-password");
            const roomdetails = {
                name: req.body.name,
                address: req.body.address,
                city: req.body.city,
                pincode: parseInt(req.body.pincode, 10),
                state: req.body.state,
                mail: user.email,
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