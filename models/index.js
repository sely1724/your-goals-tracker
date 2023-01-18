const User = require('./User');
const Goal = require('./Goal');
const Comment = require('./Comment');
const Milestone = require('./Milestone');

// each user has many goals
User.hasMany(Goal, {
   foreignKey: 'user_id'
});
Goal.belongsTo(User, {
   foreignKey: 'user_id'
});

// each goal has many comments
Goal.hasMany(Comment, {
   foreignKey: 'goal_id'
});
Comment.belongsTo(Goal, {
   foreignKey: 'goal_id'
});

// each goal has many milestones
Goal.hasMany(Milestone, {
   foreignKey: 'goal_id'
});
Milestone.belongsTo(Goal, {
   foreignKey: 'goal_id'
});

module.exports = { Goal, User, Comment, Milestone };