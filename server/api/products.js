const router = require('express').Router()
const {Product} = require('../db/models')

// We're in /api/products
function isAdmin(req, res, next) {
  if (req.user.admin) {
    next()
  } else {
    res.sendStatus(403)
  }
}
// Get route to get all offered products
router.get('/', async (req, res, next) => {
  try {
    const product = await Product.findAll()
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// Get route to get info on a single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// Post route to add a product to the database
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description || '',
      imageUrl: req.body.imageUrl || 'default.png',
      rating: req.body.rating || 0
    })
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// Put route to edit a product
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description || '',
        imageUrl: req.body.imageUrl || 'default.png',
        rating: req.body.rating || 0
      },
      {
        where: {
          id: req.params.id
        },
        returning: true
      }
    )
    res.send(product[1][0])
  } catch (error) {
    next(error)
  }
})

// Delete route to remove a product from database
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.send(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
