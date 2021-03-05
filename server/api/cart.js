const router = require('express').Router()
const {Cart, User, Product} = require('../db/models')

// We're in /api/carts/

function isAdmin(req, res, next) {
  if (req.user.admin) {
    next()
  } else {
    res.sendStatus(403)
  }
}

// Get route to get a cart belonging to a user
router.get(
  '/:userId',
  (req, res, next) => {
    if (req.user.id === Number(req.params.userId)) {
      console.log(`User matches, please proceed`)
      next()
    } else {
      console.log(`Out, impostor!`)
      res.sendStatus(403)
    }
  },
  async (req, res, next) => {
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
  }
)

// Put route to update quantity of a product inside a user's cart
router.put('/:userId/:productId', isAdmin, async (req, res, next) => {
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
router.post('/', isAdmin, async (req, res, next) => {
  try {
    //console.log(req.body)
    const cart = await Cart.findOrCreate({
      where: {
        userId: req.body.userId,
        productId: req.body.productId,
        quantity: req.body.quantity || 1
      }
    })
    console.log('CART', cart)
    if (cart[1]) {
      res.json(cart[0])
    } else {
      res.send('You already have this item in your cart')
    }
  } catch (err) {
    next(err)
  }
})

// Post route for when guest logs in -> Creates a new cart with guest ID + product ID + quantity
router.post('/guestlogin', async (req, res, next) => {
  try {
    console.log(`======REQ.BODY.ARRAY=============`, req.body.array)
    const cart = await Cart.bulkCreate(req.body.array)
    console.log(`RETURNED CART`, cart)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// Delete route to remove item from cart
router.delete('/:userId/:productId', isAdmin, async (req, res, next) => {
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
router.delete('/:userId', isAdmin, async (req, res, next) => {
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
