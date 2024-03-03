const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogsRouter.get('/:id', (req, res, next) => {
	Blog.findById(req.params.id)
		.then((blog) => {
			if (blog) {
				res.json(blog)
			} else {
				res.status(404).end()
			}
		})
		.catch((err) => next(err))
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

blogsRouter.delete('/:id', (req, res, next) => {
	Blog.findByIdAndDelete(req.params.id)
		.then(() => res.status(204).end())
		.catch((err) => next(err))
})

blogsRouter.put('/:id', (req, res, next) => {
	const body = req.body
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0
	})

	Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
		.then((updatedBlog) => res.json(updatedBlog))
		.catch((err) => next(err))
})

module.exports = blogsRouter