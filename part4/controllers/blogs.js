const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
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

blogsRouter.post('/', async (req, res, next) => {
	const body = req.body
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0
	})
	let savedBlog = undefined
	try {
		savedBlog = await blog.save()
	} catch (exception) {
		res.status(400).end()
		next(exception)
		return
	}
	res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndDelete(req.params.id)
	res.status(204).end()
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