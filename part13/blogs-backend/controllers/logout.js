const router = require('express').Router()
const { userExtractor } = require('../util/middleware')

router.delete('/', userExtractor, async (req, res) => {
  await req.session.destroy()
  return res.status(200).json({ message: `${req.user.name} logged out` })
})

module.exports = router