const router = require('express').Router()
const {Cart, User, Product} = require('../db/models')

router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await User.findOne({
      where: {
        id: Number(req.params.userId)
      },
      include: [
        {
          model: Cart
        },
        {
          model: Product
        }
      ]
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/:productId', async (req, res, next) => {
  try {
    const cart = await Cart.update(req.body, {
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/:productId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    await cart.destroy()
    res.send(cart)
  } catch (error) {
    next(error)
  }
})
