const { Router } = require("express");
const express = require("express");
const router = express.Router();
//const withAuth = require("../../utils/auth");  or whatever folder is...
const { Goal } = require("../../models");

//create from User's Personal Page - we call this
router.post("/", async (req, res) => {
  try {
    //console.log(req.body);
    //console.log(typeof req.body.completed);
    const dbGoalData = await Goal.create({
      content: req.body.content,
      finish_by: req.body.finish_by,
      completed: req.body.completed,
      //user_id: req.session.userId,
    });
    res.status(200).json(dbGoalData);
    console.log(dbGoalData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateGoal = await Goal.update(
      {
        content: req.body.content,
        finish_by: req.body.finish_by,
        completed: req.body.completed,
        //user_id: req.session.userId,
      },
      {
        where: {
          id: req.params.id,
        },
      }

      //how to finish update?????
    );
    res.status(200).json(updateGoal);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete route by specific id.
router.delete("/:id", async (req, res) => {
  try {
    const deleteGoal = await Goal.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(deleteGoal);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/userid/:id", async (req, res) => {
  try {
    const dbGoalData = await Goal.findAll({
      where: {
        user_id: req.params.id
      }
    })

    console.log(goalData);

    const goalData = dbGoalData.map((goal) => goal.get({ plain: true }))

    res.status(200).json(goalData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
