const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = helper.initalBlogs.map((blog) => new Blog(blog))
	const promiseArray = blogObjects.map((blogObject) => blogObject.save())
	await Promise.all(promiseArray)
})

test('get returns json and correct length', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	const blogsAfter = await helper.blogsInDb()
	assert.strictEqual(blogsAfter.length, helper.initalBlogs.length)
})

test('properties includes id', async () => {
	const blogsAfter = await helper.blogsInDb()
	assert(blogsAfter.every((blog) => Object.prototype.hasOwnProperty.call(blog, 'id')))
})

test('post validation', async () => {
	await api
		.post('/api/blogs')
		.send(helper.oneBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const blogsAfter = await helper.blogsInDb()
	assert.strictEqual(blogsAfter.length, helper.initalBlogs.length + 1)
	const titles = blogsAfter.map((blog) => blog.title)
	assert(titles.includes(helper.oneBlog.title))
	const urls = blogsAfter.map((blog) => blog.url)
	assert(urls.includes(helper.oneBlog.url))
})

test('post with no likes property has 0 likes', async () => {
	const noIdBlog = {
		title: 'I have no id and will get 0 likes',
		author: 'No Id',
		url: 'noid.com'
	}
	await api
		.post('/api/blogs')
		.send(noIdBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const blogsAfter = await helper.blogsInDb()
	assert.strictEqual(blogsAfter.length, helper.initalBlogs.length + 1)
	const savedBlog = blogsAfter.find((blog) => blog.title === noIdBlog.title)
	assert.strictEqual(savedBlog.likes, 0)
})

test('post with no title res 400', async () => {
	const noTitleBlog = {
		author: 'No Title',
		url: 'notitle.com',
		likes: 1
	}
	await api
		.post('/api/blogs')
		.send(noTitleBlog)
		.expect(400)
	const blogsAfter = await helper.blogsInDb()
	assert.strictEqual(blogsAfter.length, helper.initalBlogs.length)
})

test('post with no url res 400', async () => {
	const noUrlBlog = {
		title: 'I don\'t have a web address',
		author: 'No Url',
		likes: 9
	}
	await api
		.post('/api/blogs')
		.send(noUrlBlog)
		.expect(400)
	const blogsAfter = await helper.blogsInDb()
	assert.strictEqual(blogsAfter.length, helper.initalBlogs.length)
})

after(async () => {
	await mongoose.connection.close()
})