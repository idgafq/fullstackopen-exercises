const Blog = require('./blog')
const User = require('./user')
const UserBlog = require('./userBlog')
const Session = require('./session')

User.hasMany(Blog, { as: 'uploadedBlogs'})
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserBlog, as: 'readings', onDelete: 'CASCADE' })
Blog.belongsToMany(User, { through: UserBlog, onDelete: 'CASCADE' })

User.hasMany(Session, { onDelete: 'CASCADE' })
Session.belongsTo(User)

module.exports = {
  User, Blog, UserBlog, Session
}