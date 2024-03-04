const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash('secret', 10)
	const user = new User({ username: 'root', passwordHash })
	await user.save()
})

describe('user creation validations', () => {
	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}
		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
		const usernames = usersAtEnd.map(u => u.username)
		assert(usernames.includes(newUser.username))
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}
		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		assert(result.body.error.includes('expected `username` to be unique'))
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)
	})

	test('creation fails with proper statuscode if username has less than 3 length', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'oo',
			name: 'Superuser',
			password: 'salainen',
		}
		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)
	})

	test('creation fails with proper statuscode if password has less than 3 length', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			username: 'acceptable',
			name: 'Superuser',
			password: 'aa',
		}
		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		const usersAtEnd = await helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, usersAtStart.length)
	})
})

after(async () => {
	await mongoose.connection.close()
})