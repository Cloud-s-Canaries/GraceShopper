const router = require('express').Router()
const {Cart, User, Product} = require('../db/models')

// We're in /api/carts/

function isUser(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.user.id === Number(req.params.userId)) {
      next()
    } else {
      res.sendStatus(403)
    }
  } else next()
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
    if (cart) {
      res.status(200).json(cart)
    } else if (!cart) {
      res.status(404).json('No cart found')
    }
  } catch (error) {
    next(error)
  }
})

// Put route to update quantity of a product inside a user's cart
router.put('/:userId/:productId', isUser, async (req, res, next) => {
  try {
    await Cart.update(
      {quantity: req.body.quantity},
      {
        where: {
          userId: req.params.userId,
          productId: req.params.productId
        }
      }
    )
    const user = await User.findOne({
      where: {id: req.params.userId},
      include: Product
    })

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404)
    }
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
      const cart = await Cart.findOrCreate({
        where: {
          userId: req.body.userId,
          productId: req.body.productId
        }
      })

      if (cart[1]) {
        const updatedCart = await User.findOne({
          where: {
            id: req.body.userId
          },
          include: Product
        })

        res.json(updatedCart.products)
      } else {
        cart[0].quantity = cart[0].quantity + 1
        await cart[0].save()
        const updatedCart = await User.findOne({
          where: {
            id: req.body.userId
          },
          include: Product
        })
        res.json(updatedCart.products)
      }
    } catch (err) {
      next(err)
    }
  }
)

// Post route for when guest logs in -> Creates a new cart with guest ID + product ID + quantity
router.post('/guestlogin', async (req, res, next) => {
  try {
    await req.body.array.forEach(async item => {
      await Cart.findOrCreate({
        where: {
          userId: item.userId,
          productId: item.productId,
          quantity: item.quantity
        }
      })
    })
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

    if (!cart) {
      res.status(404).json('The cart item is not in the database')
    }
    if (cart) {
      await cart.destroy()
      res.json(cart)
    }
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
    if (!cart) {
      res.status(404).json(`This cart does not exist`)
    }
    if (cart) {
      cart.forEach(async singleCart => {
        await singleCart.destroy()
      })
      res.status(204).json(cart)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
