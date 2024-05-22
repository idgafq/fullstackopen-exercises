const { SECRET } = require('./config')
const jwt = require('jsonwebtoken')
const { User, Session } = require('../models')

const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const userExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

      req.session = await Session.findByPk(req.decodedToken.sessionId)
      if (!req.session) {
        return res.status(401).json({ error: 'session expired' })
      }
      if (req.session.expiresAt.getTime() < Date.now()) {
        await req.session.destroy()
        return res.status(401).json({ error: 'session expired' })
      }

      req.user = await User.findByPk(req.decodedToken.id)
      if (!req.user || req.user.disabled) {
        return res.status(401).json({ error: 'user invalid' })
      }
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}


module.exports = { errorHandler, userExtractor }