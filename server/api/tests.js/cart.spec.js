const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Cart = db.model('cart')
const Product = db.model('product')
const User = db.model('user')

describe('Cart routes', () => {
  let item
  beforeEach(async () => {
    const product = {name: 'batman', price: 44, rating: 3}
    await db.sync({force: true})
    const _users = await User.bulkCreate(
      [
        {email: 'cody@email.com', password: '123'},
        {email: 'admin@email.com', password: '123', admin: true},
        {email: 'murphy@email.com', password: '123'}
      ],
      {hooks: false}
    )
    item = await Product.create(product)
    const cart = await Cart.create({userId: 1, productId: 1, quantity: 3})
    const [user1, admin, user2] = _users
    // await user1.addCart(item)
  })

  describe('/api/carts', () => {
    it('GET /api/carts/userId grabs the cart of a specific user, returning the user and the items', async () => {
      const res = await request(app)
        .get('/api/carts/1')
        // .auth('test@email.com'.toString('base64'), '123'.toString('base64'))
        .expect(200)

      expect(res.body).to.be.an('Object')
      expect(res.body.email).to.equal('cody@email.com')
    })
    it("contains all products in a user's cart", async () => {
      const res = await request(app)
        .get('/api/carts/1')
        // .auth('test@email.com'.toString('base64'), '123'.toString('base64'))
        .expect(200)

      expect(res.body.products).to.be.an('Array')
      expect(res.body.products.length).to.equal(1)
      expect(res.body.products[0].id).to.equal(item.id)
    })

    it('allows users to edit the quantity of the items in their cart', async () => {
      const res = await request(app)
        .put('/api/carts/1/1')
        .send({quantity: 10})
        .expect(200)

      expect(res.body.products).to.be.an('Array')
      expect(res.body.products.length).to.equal(1)
      expect(res.body.products[0].cart.quantity).to.equal(10)
    })
  })
})
