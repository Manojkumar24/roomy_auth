const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

//@route GET api/auth
//@access public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// router.get('/', function(req, res) {
//   User.find({}, function(err, Users){
//     if (err)
//         return done(err);

//     if (Users) {
//       console.log("Users count : " + Users.length);
//       res.render('profile.ejs', {
//         usersArray: Users
//       });
//     }
//   });
// });
//@route POST api/auth
//@access public
router.post(
  '/',

  (req, res) => {
    //const salt =  bcrypt.genSalt(10);
    //const pas = req.body.password;
    //const passwordnew =  bcrypt.hash(pas, salt);
    //console.log(passwordnew)
    //var newPassword = new User(req.body);
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      // const email = req.body;

      User.find({}, function(err, Users) {
        if (err) return done(err);

        if (Users) {
          console.log('Users count : ' + Users.length);
          //res.render('profile.ejs', {
          global.usersArray;
          global.userscount;
          global.usersArray = Users;
          global.userscount = Users.length;

          //});
        }
      });
      let data = global.usersArray;
      let count = global.userscount;

      //console.log(data[2].email);
      var e_mail = req.body.email;
      var sum = '0';
      var cunt = '1';
      for (let i = 0; i < count; i++) {
        if (e_mail != data[i].email) {
          sum = sum - 0 + (cunt - 0);
        }
      }
      console.log(sum);
      console.log(count);
      // console.log(User.email)

      // // console.log(email);
      // let user =  User.findOne({ email }); //email: req.body.email
      // console.log(user);
      if (sum == count) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'email doesnot found ' }] });
      }
      User.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.password },
        { new: false },
        function(err, doc) {
          if (err) {
            //console.log(err);
            res.end();
          } else {
            console.log('password updated');
            //res.redirect('http://localhost:5000/forgotpassword')
            return res.status(200).json({  msg: 'password updated successfully so please go to login'  });
          }
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
  // function(req,res){
  //     //console.log(req.body);
  //     //res.send({type:'PUT'});

  // [
  //   check('email', 'enter correct email').isEmail(),
  //   check('password', 'minimum length of password is 6 characters').isLength({
  //     min: 6
  //   })
  // ],
  // async (req, res) => {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   const email = req.body.email;
  //   //password = await bcrypt.hash(password, salt);
  //   //const { email, password } = req.body;
  //   try {
  //     User.findOneAndUpdate({ email }, req.body);
  //     console.log('updated successfully')
  //      //email: req.body.email

  // if (!user) {
  //   return res
  //     .status(400)
  //     .json({ errors: [{ msg: 'user with email already exists' }] });
  // }

  //var name = 'kk'
  //user = new User({ name, email, password });

  //const salt = await bcrypt.genSalt(10);

  //user.password = await bcrypt.hash(password, salt);

  //await user.findOneAndUpdate({email}, req.body);

  // const payload = {
  //   user: {
  //     id: user.id
  //   }
  // };

  // jwt.sign(
  //   payload,
  //   config.get('jwtSecret'),
  //   { expiresIn: 360000 },
  //   (err, token) => {
  //     if (err) throw err;
  //     res.json({ token });
  //   }
  // );
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('server error');
  //   }
  // }
);

module.exports = router;
