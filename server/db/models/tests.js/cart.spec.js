/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../index')
const Cart = db.model('cart')

xdescribe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  it('has Quantity of item stored', async () => {
    const cart = await Cart.build({
      userId: 3,
      productId: 3,
      quantity: 45
    })
    expect(cart.quantity).to.equal(45)
  })

  it('is a through table that uses the productId', async () => {
    try {
      await Cart.create({
        userId: 3,
        quantity: 3
      })
    } catch (err) {
      expect(err.message).to.contain(
        'null value in column "productId" violates not-null constraint'
      )
    }
  })

  it('is a through table that uses the userId', async () => {
    try {
      await Cart.create({
        productId: 3,
        quantity: 3
      })
    } catch (err) {
      expect(err.message).to.contain(
        'null value in column "userId" violates not-null constraint'
      )
    }
  })

  it('has a min of 1 on quantity', async () => {
    try {
      await Cart.build({
        quantity: 0
      })
    } catch (err) {
      expect(err.message).to.contain(
        'SequelizeValidationError: Validation error: Validation min on quantity failed'
      )
    }
  })
})

// await cart.validate()
// expect(cart.quantity).to.be.a('number')
// expect(cart.quantity).to.be.greaterThan(0)
