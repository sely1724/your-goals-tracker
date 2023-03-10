const router = require('express').Router();
const { Comment } = require('../../models');

// POST route to create a new comment
router.post('/:id', async (req, res) => {
    // create a new comment
    try {
        const dbCommentData = await Comment.create({
            // (content, date, goal_id) should be provided from /public/js folder during fetch request 
            // in JSON.stringify({ content, date, goal_id})
            content: req.body.comment,
            user_id: req.session.userId, // to get from session in cookies 
            goal_id: req.params.id, // to get from URL in public/js/...
            // user_id: req.session.userId,  // if needed user ID from the cookies
        });
        
            res
            .status(200)
            .json({comment: dbCommentData, message: 'Your comment is saved!'} );
    
        } catch(err) {
          console.log(err);
          res.status(500).json(err);
        }
});

// PUT route to update a comment
router.put('/:id', async (req, res) => {
    // update a comment by its `id` value
    try {
        const dbCommentData = await Comment.update({
            // (content, date, goal_id) should be provided from /public/js folder during fetch request 
            // in JSON.stringify({ content, date, goal_id})
            content: req.body.content,
            user_id: req.session.userId, // to get from session in cookies 
            goal_id: req.body.goal_id, // to get from URL in public/js/...
            // user_id: req.session.userId,  // if needed user ID from the cookies
        },
        { where: { id: req.params.id  } });
        
            res
            .status(200)
            .json({comment: dbCommentData, message: 'Your comment is updated!'} );
    
        } catch(err) {
          console.log(err);
          res.status(500).json(err);
        }
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