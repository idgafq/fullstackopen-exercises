const router = require('express').Router()
const { userExtractor } = require('../util/middleware')

const { UserBlog, User, Blog } = require('../models')

router.post('/', async (req, res) => {
    const { blogId, userId } = req.body

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(400).json({ error: 'user not found' })
    }

    const blog = await Blog.findByPk(blogId)
    if (!blog) {
      return res.status(400).json({ error: 'blogs not found' })
    }

    const savedUserBlog = await UserBlog.create({ blogId, userId })
    res.json(savedUserBlog)
})

router.put('/:id', userExtractor, async (req, res) => {
  const userBlog = await UserBlog.findByPk(req.params.id)
  if (!userBlog) {
    return res.status(404).end()
  }

  if (req.user.id !== userBlog.userId) {
    return res.status(400).json({ error: 'user does not match' })
  }
  
  userBlog.read = req.body.read
  await userBlog.save()
  res.json(userBlog)
})

module.exports = router