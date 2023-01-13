const User = require('./User');
const Goal = require('./Goal');

User.hasMany(Goal, {
   foreignKey: 'user_id'
});
Goal.belongsTo(User, {
   foreignKey: 'user_id'
});

module.exports = { Goal, User };