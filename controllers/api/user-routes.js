const router = require('express').Router();
const { User } = require('../../models');

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;   // loggedIn varaible is set to browser to mark session as loged in
      req.session.userId = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Sign up
// body format: {
//   username: STRING,
//   email: STRING,
//   password: STRING
// }
router.post('/signup', async (req, res) => {
  try {
    console.log("this is " + req.body);
    // console.log("this is " + dbUserData);
    // console.log("this is " + dbUserData);

    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
console.log("this is " + dbUserData);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;

      res.status(200).json(dbUserData);
    });

    // res.status(200).json({ comment: dbUserData, message: 'New account created!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;