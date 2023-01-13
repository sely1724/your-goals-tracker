const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Goal extends Model { }

Goal.init(
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
      finish_by: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      completed: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'User',
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

module.exports = Goal;