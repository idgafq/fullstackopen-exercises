const { test, after, beforeEach, describe } = require('node:test')
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

describe('dabatase initialization', () => {
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
})


describe('post validations', () => {
	test('single blog post', async () => {
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
})

describe('deletion validations', () => {
	test('single blog deletion', async () => {
		const blogsBefore = await helper.blogsInDb()
		const blogToDelete = blogsBefore[0]
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)
		const blogsAfter = await helper.blogsInDb()
		assert.strictEqual(blogsAfter.length, helper.initalBlogs.length - 1)
		const titles = blogsAfter.map((blog) => blog.title)
		assert(!titles.includes(blogToDelete.title))
	})

	test('cannot delete nonexistent blog', async () => {
		const fakeId = await helper.nonExistingId
		await api
			.delete(`/api/blogs/${fakeId}`)
			.expect(400)
		const blogsAfter = await helper.blogsInDb()
		assert.strictEqual(blogsAfter.length, helper.initalBlogs.length)
	})
})

describe('put validations', () => {
	test('single blog update', async () => {
		const blogsBefore = await helper.blogsInDb()
		const blogToUpdate = blogsBefore[0]
		const updatedBlog = { ...blogToUpdate, title: 'Changed Title' }
		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const blogsAfter = await helper.blogsInDb()
		assert.strictEqual(blogsAfter.length, helper.initalBlogs.length)
		const savedBlog = blogsAfter.find((blog) => blog.id === blogToUpdate.id)
		assert(savedBlog.title, 'Changed Title')
	})

	test('cannot update nonexistent blog', async () => {
		const fakeId = await helper.nonExistingId
		await api
			.put(`/api/blogs/${fakeId}`)
			.send(helper.oneBlog)
			.expect(400)
		const blogsAfter = await helper.blogsInDb()
		assert.strictEqual(blogsAfter.length, helper.initalBlogs.length)
		const titles = blogsAfter.map((blog) => blog.title)
		assert(!titles.includes(helper.oneBlog.title))
	})
})

after(async () => {
	await mongoose.connection.close()
})