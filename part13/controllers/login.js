const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../models')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect && !user.disabled)) {
    return response.status(401).json({
      error: 'invalid username or password or user is disabled'
    })
  }

  const session = await Session.create({ 
    userId: user.id,
    expiresAt: new Date(Date.now() + 24*60*60*1000)
  })

  const sessionInfo = {
    username: user.username,
    id: user.id,
    sessionId: session.id
  }

  const token = jwt.sign(sessionInfo, SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router