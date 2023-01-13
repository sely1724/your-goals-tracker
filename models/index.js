const User = require('./User');
const Goal = require('./Goal');

User.hasMany(Goal);
Goal.belongsTo(User);

module.exports = { Goal, User };