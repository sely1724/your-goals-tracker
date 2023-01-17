const router = require('express').Router();
const { Comment } = require('../../models');

// POST route to create a new comment
router.post('/', (req, res) => {
    // create a new comment
  
    /* req.body should look like this...
      {
        "content": "New Comment",
        "user_id": 1,
        "goal_id": 2
      }
    */
    // create a new milestone
    Comment.create(req.body)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

// PUT route to update a comment
router.put('/:id', (req, res) => {
    // update a comment by its `id` value

    /* req.body should look like this...
      {
        "content": "New Comment",
        "user_id": 1,
        "goal_id": 2
      }
    */

    Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DELETE route to delete a comment
router.delete('/:id', async (req, res) => {
    // delete a comment by its `id` value
    
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with that id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  module.exports = router;