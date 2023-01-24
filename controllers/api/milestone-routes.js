const router = require('express').Router();
const { Milestone } = require('../../models');

router.post('/', async (req, res) => {
    // create a new milestone
  
    /* req.body should look like this...
      {
        "content": "New Milestone",
        "date_completed": 11-11-2023,
        "goal_id": 2
      }
    */
   try {
    const dbMilestoneData = await Milestone.create({
        // (content, date, goal_id) should be provided from /public/js folder during fetch request 
        // in JSON.stringify({ content, date, goal_id})
        content: req.body.content,
        date_completed: req.body.date,
        goal_id: req.body.goal_id,
        // user_id: req.session.userId,  // if needed user ID from the cookies
    });
    
        res
        .status(200)
        .json({comment: dbMilestoneData, message: 'Your milestone is saved!'} );

    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.put('/:id', async (req, res) => {
    // update a milestone by its `id` value

    /* req.body should look like this...
      {
        "content": "New MIlestone",
        "date_completed": 11-11-2023,
        "goal_id": 2
      }
    */

    /*Milestone.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((milestone) => {
      res.status(200).json(milestone);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });*/

    try {
        const dbMilestoneData = await Milestone.update({
            // (content, date, goal_id) should be provided from /public/js folder during fetch request 
            // in JSON.stringify({ content, date, goal_id})
            content: req.body.content,
            date_completed: req.body.date,
            goal_id: req.body.goal_id,
            // user_id: req.session.userId,  // if needed user ID from the cookies
        },
        { where: { id: req.params.id  } });
        
            res
            .status(200)
            .json({comment: dbMilestoneData, message: 'Your milestone is updated!'} );
    
        } catch(err) {
          console.log(err);
          res.status(500).json(err);
        }
    
  });
  
  router.delete('/:id', async (req, res) => {
    // delete a milestone by its `id` value
    
    try {
      const milestoneData = await Milestone.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!milestoneData) {
        res.status(404).json({ message: 'No milestone found with that id!' });
        return;
      }
  
      res.status(200).json(milestoneData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;