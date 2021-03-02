const router = require('express').Router()
const {Cart, User} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await User.findOne({
      where: {
        id: Number(req.params.userId)
      },
      include: Cart
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
