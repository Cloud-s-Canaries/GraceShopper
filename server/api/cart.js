const router = require('express').Router()
const {Cart, User, Product} = require('../db/models')

// We're in /api/carts/

function isUser(req, res, next) {
  if (req.user.id === Number(req.params.userId)) {
    next()
  } else {
    res.sendStatus(403)
  }
}

// Get route to get a cart belonging to a user
router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const cart = await User.findOne({
      where: {
        id: Number(req.params.userId)
      },
      include: [
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

// Put route to update quantity of a product inside a user's cart
router.put('/:userId/:productId', isUser, async (req, res, next) => {
  try {
    const cart = await Cart.update(
      {quantity: req.body.quantity},
      {
        where: {
          userId: req.params.userId,
          productId: req.params.productId
        }
      }
    )
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// Post route to add an item to cart.
router.post(
  '/',
  (req, res, next) => {
    if (req.user.id === Number(req.body.userId)) {
      next()
    } else {
      res.sendStatus(403)
    }
  },
  async (req, res, next) => {
    try {
      //console.log(req.body)
      const cart = await Cart.findOrCreate({
        where: {
          userId: req.body.userId,
          productId: req.body.productId,
          quantity: req.body.quantity || 1
        }
      })
      if (cart[1]) {
        res.json(cart[0])
      } else {
        res.send('You already have this item in your cart')
      }
    } catch (err) {
      next(err)
    }
  }
)

// Post route for when guest logs in -> Creates a new cart with guest ID + product ID + quantity
router.post('/guestlogin', async (req, res, next) => {
  try {
    const cart = await Cart.bulkCreate(req.body.array)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// Delete route to remove item from cart
router.delete('/:userId/:productId', isUser, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        productId: req.params.productId
      }
    })
    await cart.destroy()

    res.json(cart)
  } catch (error) {
    next(error)
  }
})

// Delete route to delete the entire cart
router.delete('/:userId', isUser, async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.userId
      }
    })
    cart.forEach(async singleCart => {
      await singleCart.destroy()
    })
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
