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

//@route POST api/auth
//@access public
router.post(
  '/',
  [
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'Enter valid password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    //console.log(email);
    try {
      let user = await User.findOne({ email }); //email: req.body.email
      //console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      // if (!user.isOwner){
      //   console.log('customer details not allowed here ');
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: 'customer details not allowed here ' }] });

      // }
      if (!user.isVerified)
        return res
          .status(401)
          .send({
            type: 'not-verified',
            msg: 'Your account has not been verified.'
          });
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

module.exports = router;
