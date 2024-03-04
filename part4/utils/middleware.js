const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method)
	logger.info('Path:  ', req.path)
	if (!(/users/.test(req.path) || /login/.test(req.path))) {
		logger.info('Body:  ', req.body)
	}
	logger.info('---')
	next()
}

const getTokenFrom = (req) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}
const userExtractor = (req, res, next) => {
	/* global process */
	if (req.get('authorization')) {
		const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
		req.user = decodedToken.id || undefined
	} else {
		req.user = undefined
	}
	next()
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	} else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		return res.status(400).json({ error: 'expected `username` to be unique' })
	} else if (error.name ===  'JsonWebTokenError') {
		return res.status(400).json({ error: 'token missing or invalid' })
	} else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({
			error: 'token expired'
		})
	}
	next(error)
}

module.exports = {
	requestLogger,
	userExtractor,
	unknownEndpoint,
	errorHandler
}