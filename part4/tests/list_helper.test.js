const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const oneBlogArray = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	}
]
const blogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]

test('dummy returns 1', () => {
	const blogs = []
	const result = listHelper.dummy(blogs)
	assert.strictEqual(result, 1)
})

describe('total likes', () => {
	test('ready-made list has 36 total likes', () => {
		assert.strictEqual(listHelper.totalLikes(blogs), 36)
	})
	test('empty list has 0 likes', () => {
		assert.strictEqual(listHelper.totalLikes([]), 0)
	})
	test('one blog list has likes of one blog', () => {
		assert.strictEqual(listHelper.totalLikes(oneBlogArray), 7)
	})
})

describe('most liked', () => {
	test('ready-made list most liked is "canonical"', () => {
		assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
	})
	test('empty list returns undefined', () => {
		assert.strictEqual(listHelper.favoriteBlog([]), undefined)
	})
	test('one blog list returns that blog', () => {
		assert.deepStrictEqual(listHelper.favoriteBlog(oneBlogArray), oneBlogArray[0])
	})
})

describe('most blogs', () => {
	test('ready-made list author with most blogs is Robert with 3 blogs', () => {
		assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Robert C. Martin', blogs: 3 })
	})
	test('empty list returns undefined', () => {
		assert.strictEqual(listHelper.mostBlogs([]), undefined)
	})
	test('one blogs list returns the author of that blog', () => {
		assert.deepStrictEqual(listHelper.mostBlogs(oneBlogArray), { author: 'Michael Chan', blogs: 1 })
	})
})

describe('most likes', () => {
	test('ready-made list author with most likes is Edsger with 17 likes', () => {
		assert.deepStrictEqual(listHelper.mostLikes(blogs), { author: 'Edsger W. Dijkstra', likes: 17 })
	})
	test('empoty list returns undefined', () => {
		assert.strictEqual(listHelper.mostLikes([]), undefined)
	})
	test('one blog list returns the author and likes of that blog', () => {
		assert.deepStrictEqual(listHelper.mostLikes(oneBlogArray), { author: 'Michael Chan', likes: 7 })
	})
})