const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const Token = require('../../models/Token');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator/check');
const Email = require('./send_email');
const randomToken = require('random-token');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

// @route POST api/users
// @access public
router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'enter correct email').isEmail(),
    // check('password', 'minimum length of password is 6 characters').isLength({
    //   min: 6
    // })
  ],
  async (req, res) => {
    console.log("inside ownre");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email }); //email: req.body.email

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user with email already exists' }] });
      }

      const avatar = gravatar.url(email, {
        d: 'mm',
        s: '200',
        r: 'pg'
      });
      const gen_token = randomToken(55);
      // Email.send_verification_token(gen_token, email);
      //var newValues = { $set: { token: gen_token } };
      isOwner = true;
      user = new User({ name, email, avatar, password,isOwner });

      //user = new User({ name, email, avatar, password });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, 10);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

// router.get('/verify/:token', confirm_email);

// function confirm_email(req, res) {
//   let randToken = req.params.token;
//   //var newValues = { $set: { isVerified: true } };
//   console.log('hello');
//   User.findOne({
//     token: randToken
//   })
//     .then(user => {
//       if (user) {
//         res.redirect('http://localhost:3000/users/verified');
//       } else {
//         res.json({ error: 'not verified' });
//         //res.redirect('http://localhost:3000/#/Email_Verification/0')
//       }
//     })
//     .catch(err => {
//       res.json('error:' + err);
//       //res.redirect('http://localhost:3000/#/Email_Verification/0')
//     });
// }
// router.get('/verify/:token', confirm_email)

// function confirm_email(req, res) {

//   let randToken = req.params.token;
//   //var newValues = { $set: { isVerified: true } };
//   console.log('hello');
//   Token.findOne({
//     token: randToken
//   })
//     .then(user => {
//       if (user) {
//         console.log('success');
//         res.redirect('http://localhost:3000/users/verified');
//       }
//       else {
//         res.json({ error: "not verified" })
//         //res.redirect('http://localhost:3000/#/Email_Verification/0')
//       }
//     })
//     .catch(err => {
//       res.json('error:' + err)
//       //res.redirect('http://localhost:3000/#/Email_Verification/0')
//     });

// }
router.get('/verify/:token', confirm_email)

function confirm_email(req, res) {

  let randToken = req.params.token;
  //var newValues = { $set: { isVerified: true } };
  console.log('hello');
  var arr = randToken.split('**');
  //console.log(arr);
  let tok = arr[0];
  let em = arr[1];
  Token.findOne({
    token: tok
  }, function(err, token){
    if (!token){
      return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.'});

      
    }
    User.findOneAndUpdate(
      { email: em },
      { isVerified: true   },
      { isOwner: true },
      function(err, doc) {
        if (err) {
          console.log(err);
          res.end();
        } else {
          res.send('Account verification successsful!');
        }
      }
    );

    //User.findOneAndUpdate({email: em},{user.isVerified = true})
    
    //user.save();
    console.log('account verififed!!');
  });

}



// router.post(
//   '/',
//   [
//     check('name', 'name is required')
//       .not()
//       .isEmpty(),
//     check('email', 'enter correct email').isEmail(),
//     check('password', 'minimum length of password is 6 characters').isLength({
//       min: 6
//     })
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;
//     try {
//       let user = await User.findOne({ email }); //email: req.body.email
    
//       if (user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: 'user with email already exists' }] });
//       }

//       const avatar = gravatar.url(email, {
//         d: 'mm',
//         s: '200',
//         r: 'pg'
//       });
//       //const gen_token = randomToken(55);
//       //Email.send_verification_token(gen_token, email);
//       const isOwner = true;
//       user = new User({ name, email, avatar, password, isOwner});

//       //const salt = await bcrypt.genSalt(10);

//       user.password = await bcrypt.hash(password, 10);
//       //await user.save();
//       await user.save();
//       const new_token = new Token({ _userId: user.id, token: crypto.randomBytes(16).toString('hex')});
//       await new_token.save()
//       var str_email = user.email;
//       var t = new_token.token + '**' + str_email;

//       const payload = {
//         user: {
//           id: user.id
//         }
//       };
      
//       console.log("after signing");
      
//       jwt.sign(
//         payload,
//         config.get('jwtSecret'),
//         { expiresIn: 360000 },
//         (err, token) => {
//           if (err) throw err;
//           console.log("after signing no");
//           res.json({ token });
//         }
//       );
//     } 
//     catch (err) {
//     console.error(err.message);
//     console.log("after signing error");
//     res.status(500).send('server error');
//   }
//       //console.log(t);
//       //var arr = t.split('**');
//       //console.log(arr);
//       //tok = arr[0];
//       //em = arr[1];
//       //console.log(tok);
//       //console.log(em);
//       // Email.send_verification_token(t, user.email);
//         // if (err) {
//         //   console.log('hello9');
//         //   return res.status(500).send({ msg: err.message });
//         // }
//         // console.log('hello8');
//         // var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex')});
//         // console.log('hello7');
//         // token.save(function(err){
//         //   if (err) {
//         //     return res.status(500).send({ msg: err.message});
//         //   }
//         //   Email.send_verification_token(token.token, user.email);
//         //   console.log('hello456');

    
          
    


          
//       //console.log('hello123');
//       //Email.send_verification_token(token.token, user.email);

//     // } catch (err) {
//     //   console.error(err.message);
//     //   res.status(500).send('server error');
//     // }


// // router.post('/', function(req, res, next) {
// //   req.assert('email', 'Email is not valid').isEmail();
// //   req.assert('email', 'Email cannot be blank').notEmpty();
// //   req.assert('password', 'Password cannot be blank').notEmpty();
// //   req.sanitize('email').normalizeEmail({ remove_dots: false });

// //   // Check for validation erro
// //   var errors = req.validationErrors();
// //   if (errors) return res.status(400).send(errors);

// //   User.findOne({ email: req.body.email }, function(err, user) {
// //     if (!user)
// //       return res
// //         .status(401)
// //         .send({
// //           msg:
// //             'The email address ' +
// //             req.body.email +
// //             ' is not associated with any account. Double-check your email address and try again.'
// //         });

// //     user.comparePassword(req.body.password, function(err, isMatch) {
// //       if (!isMatch)
// //         return res.status(401).send({ msg: 'Invalid email or password' });

// //       // Make sure the user has been verified
// //       if (!user.isVerified)
// //         return res
// //           .status(401)
// //           .send({
// //             type: 'not-verified',
// //             msg: 'Your account has not been verified.'
// //           });

// //       // Login successful, write token, and send back user
// //       res.send({ token: generateToken(user), user: user.toJSON() });
// //     });
// //   });
// // });
//   }
// );
module.exports = router;
