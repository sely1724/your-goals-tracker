const express = require("express");
const router = express.Router();
// require in models
const { Goal, User } = require("../models");

// GET all goals
router.get("/", async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });

    const goalDisplay = goalData.map((goal) => goal.get({ plain: true }));
    // Send goalDisplay information to the 'homepage' template
    res.render("homepage", {
      goalDisplay,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET individual goal post
router.get("/:id", async (req, res) => {
  try {
    if (!req.session.user.loggedIn) {
      console.log("Please log in or create an account");
      res.redirect("/");
    } else {
      const dbGoalData = await Goal.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["id", "name"],
          },
        ],
      });

      const goal = dbGoalData.get({ plain: true });
      // Send over the 'loggedIn' session variable to the 'gallery' template
      res.render("individual-user", { goal, loggedIn: req.session.loggedIn });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET personal page - have to login to be able to access this page
router.get("/userpage", async (req, res) => {
  try {
    if (!req.session.user.loggedIn) {
      console.log("Please log in or create an account");
      res.redirect("/");
    } else {
      const userData = await User.findByPk(req.session.user.id, {
        include: { all: true },
      });
      const hbsData = userData.get({ plain: true });
      hbsData.loggedIn = true;
      res.render("userpage", hbsData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET list of users - have to login to be able to access this page
router.get("/allUsers", async (req, res) => {
  try {
    if (!req.session.user.loggedIn) {
      console.log("Please log in or create an account");
      res.redirect("/");
    } else {
      const userData = await User.findByPk(req.session.user.id, {
        include: { all: true },
      });
      const hbsData = userData.get({ plain: true });
      hbsData.loggedIn = true;
      res.render("userpage", hbsData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login Home Route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("logout");
});

module.exports = router;
