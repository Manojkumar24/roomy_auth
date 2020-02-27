const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const Email = require('./New_mail');
const randomToken = require('random-token');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

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

router.post(
  '/',
  [check('email', 'enter correct email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    try {
      let user = await User.findOne({ email }); //email: req.body.email

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: ' email doesnot  exists try registering' }] });
      }

      // const avatar = gravatar.url(email, {
      //   d: 'mm',
      //   s: '200',
      //   r: 'pg'
      // });
      //const gen_token = randomToken(55);
      //Email.send_verification_token(gen_token, email);
      // user = new User({ name, email, avatar, password });

      //const salt = await bcrypt.genSalt(10);

      // user.password = await bcrypt.hash(password, 10);
      // //await user.save();
      // await user.save();
      const new_token = new Token({
        _userId: user.id,
        token: crypto.randomBytes(16).toString('hex')
      });
      // await new_token.save()
      var str_email = user.email;
      var t = new_token.token + '**' + str_email;
      //console.log(t);
      //var arr = t.split('**');
      //console.log(arr);
      //tok = arr[0];
      //em = arr[1];
      //console.log(tok);
      //console.log(em);
      Email.send_verification_token(t, user.email);
      // if (err) {
      //   console.log('hello9');
      //   return res.status(500).send({ msg: err.message });
      // }
      // console.log('hello8');
      // var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex')});
      // console.log('hello7');
      // token.save(function(err){
      //   if (err) {
      //     return res.status(500).send({ msg: err.message});
      //   }
      //   Email.send_verification_token(token.token, user.email);
      //   console.log('hello456');

      //console.log('hello123');
      //Email.send_verification_token(token.token, user.email);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
