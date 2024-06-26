const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class UserBlog extends Model {}

UserBlog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user_blogs'
})

module.exports = UserBlog