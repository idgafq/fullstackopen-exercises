const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog
		.find({})
		.populate('user', { username: 1, name: 1 })
		.populate('comments', { content: 1 })
	res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog
		.findById(req.params.id)
		.populate('user', { username: 1, name: 1 })
		.populate('comments', { content: 1 })
	if (blog) {
		return res.json(blog)
	} else {
		return res.status(404).end()
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
		user: user._id,
		comments: body.comments || []
	})

	let savedBlog = undefined
	try {
		savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
	} catch (exception) {
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
	if (!blog) {
		return res.status(404).json({ error: 'cannot find blog with matching id' })
	}
	if (blog.user.toString() === req.user.toString()) {
		for (const commentId of blog.comments) {
			const comment = Comment.findById(commentId)
			await comment.deleteOne()
		}

		const user = await User.findById(blog.user)
		user.blogs = user.blogs.filter((blogId) => blogId.toString() !== req.params.id)
		await user.save()

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
		likes: body.likes || 0,
		user: body.user.id,
	}

	let updatedBlog = undefined
	try {
		updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	} catch (exception) {
		next(exception)
		return
	}
	if (!updatedBlog) {
		return res.status(404).json({ error: 'cannot find blog with matching id' })
	}
	return res.status(200).json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (req, res, next) => {
	const body = req.body
	const blog = await Blog.findById(req.params.id)
	if (!blog) {
		return res.status(404).json({ error: 'cannot find blog with matching id' })
	}
	const comment = new Comment({
		content: body.content,
		blog: blog._id
	})

	let savedComment = undefined
	try {
		savedComment = await comment.save()
		blog.comments = blog.comments.concat(savedComment._id)
		await blog.save()
	} catch (exception) {
		next(exception)
		return
	}
	res.status(201).json(savedComment)
})

module.exports = blogsRouter