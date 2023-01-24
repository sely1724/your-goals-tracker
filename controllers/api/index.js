const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const goalRoutes = require('./goal-routes');
const milestoneRoutes = require('./milestone-routes');
const userRoutes = require('./user-routes');


router.use('/comment', commentRoutes);
router.use('/goal', goalRoutes);
router.use('/milestone', milestoneRoutes);
router.use('/user', userRoutes);

module.exports = router;