const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// model instance method to check password
class User extends Model {
   checkPassword(logInPw) {
      // 
      return bcrypt.compareSync(logInPw, this.password);
   }
}

/*

USER ------
   id: int, PK
   name: str(unique)
   email: str(email)
   password: str(len>=8)

*/

User.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            isEmail: true
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [8]
         }
      }
   },
   {
      // before creating an instance of the user, encrypt the password for storage.
      // app will decrypt password during checkPassword function on login attempt
      hooks: {
         beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
         }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
   }
)

module.exports = User;
