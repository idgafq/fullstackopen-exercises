const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if (blog) {
		res.json(blog)
	} else {
		res.status(404).end()
	}
})

blogsRouter.post('/', userExtractor, async (req, res, next) => {
	const body = req.body
	if (!req.user) {
		return res.status(401).json({ error: 'invalid token' })
	}
	const user = await User.findById(req.user)
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	let savedBlog = undefined
	try {
		savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
	} catch (exception) {
		res.status(400).end()
		next(exception)
		return
	}
	res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: 'invalid token' })
	}
	const blog = await Blog.findById(req.params.id)
	if (blog.user.toString() === req.user.toString()) {
		await blog.deleteOne()
		return res.status(204).end()
	} else {
		return res.status(401).json({ error: 'must be deleted by user who created this blog' })
	}
})

blogsRouter.put('/:id', async (req, res, next) => {
	const body = req.body
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0
	}

	let updatedBlog = undefined
	try {
		updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	} catch (exception) {
		res.status(400).end()
		next(exception)
		return
	}
	res.status(200).json(updatedBlog)
})

module.exports = blogsRouter