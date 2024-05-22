const router = require('express').Router()
const { userExtractor } = require('../util/middleware')
const { Op } = require('sequelize')

const { User } = require('../models')
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: '%' + req.query.search + '%'
        }
      },
      {
        author: {
          [Op.iLike]: '%' + req.query.search + '%'
        }
      }
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.post('/', userExtractor, async (req, res) => {
  const { author, url, title, likes, yearWritten } = req.body
  const savedBlog = await Blog.create({ author, url, title, likes, yearWritten, userId: req.user.id })
  res.json(savedBlog)
})

router.delete('/:id', userExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.user.id === req.blog.userId) {
      await req.blog.destroy()
      return res.status(204).end()
    } else {
      res.status(401).json({ error: 'blog can only be deleted by user that added it' })
    }
  }
  return res.status(404).json({ error: 'blog not found' })
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router