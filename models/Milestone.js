const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Milestone extends Model { }

Milestone.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      content: {
         type: DataTypes.STRING,
         allowNull: false
      },
      date_completed: {
         type: DataTypes.DATE
      },
      goal_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'Goal',
            key: 'id'
         }
      }
   },
   {
      sequelize,
      freezeTableName: true,
      timestamps: true,
   }
)