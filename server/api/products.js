const router = require('express').Router()
const {Product} = require('../db/models')

// We're in /api/products

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
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// Put route to edit a product
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.send(product[1][0])
  } catch (error) {
    next(error)
  }
})

// Delete route to remove a product from database
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.send(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
