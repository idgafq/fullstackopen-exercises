const router = require('express').Router()

const { User, Blog, UserBlog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
      as: 'uploadedBlogs'
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'readings',
      through: {
        model: UserBlog,
        as: 'readinglists',
        where: req.query.read !== undefined ? { read: req.query.read === 'true' } : {},
        attributes: ['id', 'read']
      },
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(user)
})

router.post('/', async (req, res) => {
    const { name, username } = req.body
    const savedUser = await User.create({ name, username })
    res.json(savedUser)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.username = req.body.username
    const updatedUser = await user.save()
    res.json(updatedUser)
  } else {
    res.status(404).end()
  }
})

module.exports = router