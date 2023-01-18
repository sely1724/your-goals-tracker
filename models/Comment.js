const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      content: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'User',
            key: 'id'
         }
      },
      goal_id: {
         type: DataTypes.INTEGER,
         refrences: {
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

module.exports = Comment;