const express = require("express");
const router = express.Router();
// require in models
const { Goal, User, Comment } = require("../models");

// GET all goals
router.get("/", async (req, res) => {
  try {
    // to request existed goals in db with comments to them

    const dbAllGoals = await Goal.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          attributes: ["id", "content"],
        },
      ],
    });

    const goals = dbAllGoals.map((goal) => goal.get({ plain: true }));
    console.log(goals);
    res.render("homepage", {
      // refers to homepage.handlebars
      goals,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  //add helper for login check withAuth
  try {
    if (!req.session.loggedIn) {
      console.log("Please log in or create an account");
      res.redirect("/login");
    } else {
      const dbUserData = await User.findOne({
        where: {
          id: req.session.userId,
        },
        include: [
          {
            model: Goal,
            attributes: ["id", "content", "finish_by", "completed"],
          },
        ],
      });

      const myUser = dbUserData.get({ plain: true });
      console.log(myUser);
      res.render("dashboard", {
        myUser,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET INDIVIDUAL PERSONAL GOAL- have to add a login check???
router.get("/dashboard/goal/:id", async (req, res) => {
  try {
    const dbGoalData = await Goal.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        // include comments TOO???
        // {
        //   model: Comment,
        //   attributes: ["id", "content", "user_id", "goal_id"],
        //   include: {
        //     model: Users,
        //     attributes: ["username"],
        //   },
        // },
      ],
    });

    const myGoals = dbGoalData.get({ plain: true });
    console.log(myGoals);
    res.render("personal-goals", {
      goal: myGoals,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// get user's goals for Dashboard page Maksim: added dashboard before "/" and res.render("dashboard")
// router.get("/dashboard", async (req, res) => {
//   try {
//     let loggedIn = false;

//     // Send goalDisplay information to the 'homepage' template
//     if (loggedIn == false) {
//       //CHANGE this later
//       console.log("connection works");
//       const userData = await User.findByPk(req.session.userId, {
//         include: { all: true },
//       });
//       const hbsData = userData.get({ plain: true });
//       // hbsData.loggedIn = true;
//       res.render("dashboard", {
//         //pass thru user data
//         hbsData,
//         loggedIn: true,
//       });
//     } else {
//       res.render("login", {});
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
// code below is OG dashboard get route.  We can user this to pass into dashboard page

// // GET personal page - have to login to be able to access this page
// router.get("/userpage", async (req, res) => {
//   try {
//     if (req.session && !req.session.user.loggedIn) {
//       console.log("Please log in or create an account");
//       res.redirect("/");
//     } else {
//       const userData = await User.findByPk(req.session.user.id, {
//         include: { all: true },
//       });
//       const hbsData = userData.get({ plain: true });
//       hbsData.loggedIn = true;
//       res.render("userpage", hbsData);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET individual goal post
router.get("user/:id", async (req, res) => {
  try {
    // if (!req.session.user.loggedIn) {
    //   console.log("Please log in or create an account");
    //   res.redirect("/");
    // } else {
      const dbGoalData = await Goal.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
      });

      const goal = dbGoalData.get({ plain: true });
      console.log("THIS IS GOALLLL", goal);
      // Send over the 'loggedIn' session variable to the 'gallery' template
      res.render("individual-user", {
        goal: goal,
        loggedIn: req.session.loggedIn
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET list of users - have to login to be able to access this page
router.get("/allUsers", async (req, res) => {
  try {
    if (!req.session.loggedIn) {
      console.log("Please log in or create an account");
      res.redirect("/login");
    } else {
    // get data from database
    const userData = await User.findAll({});

    // Turn data into serialized json
    const users = userData.map((user) => user.get({ plain: true }));
    console.log("THIS IS USER DATA!", users);

    // Pass serialized data into all-users
    res.render("all-users", {
      users,
      loggedIn: true,
    });
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
    res.redirect("/dashboard");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("logout");
});

// get one goal by its ID
router.get("/goal/:id", async (req, res) => {
  try {
    const dbGoal = await Goal.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        {
          model: Comment,
          attributes: [
            "id",
            "content",
          ],
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
      ],
      // nest: true,
      // raw: true,
    });

    const goal = dbGoal.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'post' template

    console.log(goal);
    console.log(req.session.userId);    

    res.render("homepage_comment", { goal, loggedIn: req.session.loggedIn, userId: req.session.userId });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get individual user goals by its ID
router.get("/user/:id", async (req, res) => {
  try {
    const individualUser = await User.findByPk(req.params.id, {
      include: [
        {
          model: Goal,
          attributes: [
            "id",
            "content",
            "completed"
          ],
          include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
          ],
        },
      ],
    });

    const userGoals = individualUser.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'post' template

    console.log(userGoals);
    res.render("individual-user", {
      userGoals, loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.get("/testchart/:id", async (req, res) => {
//   res.render('test', { id: req.params.id });
// })

module.exports = router;
