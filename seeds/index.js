const sequelize = require('../config/connection');
const { User, Goal } = require('../models');

const userData = require('./user_data.json');
const goalData = require('./goal_data.json');

const seedDatabase = async () => {
   await sequelize.sync({ force: true });

   await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
   });

   await Goal.bulkCreate(goalData);

   process.exit(0);
};

seedDatabase();