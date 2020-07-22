const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator/check');
const Email = require('./send_email_pro_verify');
//@route GET api/profile/me
//@access private
router.get('/me', auth, async (req, res) => {
  try {
    console.log(req.user.id);
    console.log('****profile*');
    const profile = await Profile.findOne({
      user: req.user.id
    });
    //const profile = await Profile.findOne({ user: req.user.id });
    console.log(profile);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'profile does not exist for this user' });
    }
    res.send(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});


// router.get("/me", async (req, res) => {
//   try {
//     const profile = await User.findOne({ _id: req.user.id });
//     let user_details = {
//       name : profile.name,
//       email : profile.email,
//       isVerified: profile.isVerified,
//       isOwner: profile.isOwner
//     }
//     res.send(user_details);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "server error" });
//   }
// });
// router.get('/me', auth, async (req, res) => {
//   try {
//     console.log(req);
//     console.log('****profile*');
//     const profile = await Profile.findOne({
//       user: req.user.id
//     }).populate('user', ['_id', 'email', 'password']);
//     //const profile = await Profile.findOne({ user: req.user.id });
//     if (!profile) {
//       return res
//         .status(400)
//         .json({ msg: 'profile does not exist for this user' });
//     }
//     res.send(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'server error' });
//   }
// });

//@route POST api/profile
//@access private
router.post('/',auth, async (req, res) => {
  //console.log(req.user);
  //console.log(req.body);
  console.log(req.body.email);
  //let profile = await Profile.findOne({user: req.user.id});
  //console.log(profile);
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const update = {
      email: req.body.email,
      phonenum : req.body.phonenum,
      password: req.body.password
      
      
      
    };
    //console.log(user._id);
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      update,
      {
        new: true
      }
    );
    
    await profile.save();
    // User.findOneAndUpdate(
    //   { name : profile.name },
    //   update
    // );
    
    // await user.save();
    console.log(profile);
    let user = User.findOneAndUpdate(
      { name : profile.name },
      update,
      {
        new: true
      }
    );
    (await user).save();
    if(user){

      console.log('hellow');
    }

    
    res.json(profile);
    //res.redirect('routes/api/profile/up');
    console.log('success')
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

//password change************************************
router.post('/pw',auth, async (req, res) => {
  //console.log(req.user);
  //console.log(req.body);
  console.log(req.body.password);
  //let profile = await Profile.findOne({user: req.user.id});
  //console.log(profile);
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    //req.body.password2 = bcrypt.hashSync(req.body.password2, 10);
    const update = {
      
      password : req.body.password,
      //password2: req.body.password2
      
      
      
    };
    //console.log(user._id);
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      update,
      {
        new: true
      }
    );
    
    await profile.save();
    // User.findOneAndUpdate(
    //   { name : profile.name },
    //   update
    // );
    
    // await user.save();
    console.log(profile);
    let user = User.findOneAndUpdate(
      { name : profile.name },
      update,
      {
        new: true
      }
    );
    (await user).save();
    if(user){

      console.log('hellow');
    }

    
    res.json(profile);
    //res.redirect('routes/api/profile/up');
    console.log('success password change')
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

//mail change************************************
router.post('/mail',auth, async (req, res) => {
  //console.log(req.user);
  //console.log(req.body);
  //console.log(req.body.password);
  //let profile = await Profile.findOne({user: req.user.id});
  //console.log(profile);
  try {
    //req.body.password = bcrypt.hashSync(req.body.password, 10);
    //req.body.password2 = bcrypt.hashSync(req.body.password2, 10);
    const update = {
      
      email : req.body.email,
      //password2: req.body.password2
      
      
      
    };
    //console.log(user._id);
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      update,
      {
        new: true
      }
    );
    
    await profile.save();
    const update1 = {
      email : req.body.email,
      isVerified: false
      //password2: req.body.password2
      
      
      
    };
    // User.findOneAndUpdate(
    //   { name : profile.name },
    //   update
    // );
    
    // await user.save();
    console.log(profile);
    let user = User.findOneAndUpdate(
      { name : profile.name },
      update1,
      {
        new: true
      }
    );
    (await user).save();
    if(user){

      console.log('hellow mail changed');
    }

    
    res.json(profile);
    //var str_email = user.email;
    //var t = new_token.token + '**' + str_email;
    //res.redirect('routes/api/profile/up');
    
    Email.send_verification_token(req.body.email);
    console.log('success mail change')
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});



// router.post(
//   "/",
//   [
//     auth,
//     [
//       check("skills", "skills are required")
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { skills, website } = req.body;
//     const profileFields = {};
//     profileFields.user = req.user.id;
//     if (website) profileFields.website = website;
//     if (skills) {
//       profileFields.skills = skills.split(",").map(skill => skill.trim());
//     }
//     try {
//       let profile = await Profile.findOne({ user: req.user.id });
//       if (profile) {
//         profile = await Profile.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: profileFields },
//           { new: true }
//         );
//         return res.json(profile);
//       }
//       profile = new Profile(profileFields);
//       await profile.save();
//       res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ msg: "server error" });
//     }
//   }
// );

//@route GET profile of one user by id api/profile/user/:user_id
//@access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      res.status(400).json({ msg: "profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(400).json({ msg: "profile not found" });
    }
    res.status(500).json({ msg: "server error" });
  }
});

//@route GET all profiles api/profile
//@access public

// router.get("/", async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate("wuser", ["name", "avatar"]);
//     res.json(profiles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "server error" });
//   }
// });

//@route DELETE user api/profile
//@access private

// router.delete("/", auth, async (req, res) => {
//   try {
//     await Profile.findOneAndRemove({ user: req.user.id });
//     await User.findOneAndRemove({ _id: req.user.id });
//     res.json({ msg: "user deleted" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "server error" });
//   }
// });

module.exports = router;
