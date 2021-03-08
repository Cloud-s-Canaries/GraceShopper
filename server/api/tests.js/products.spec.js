const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Product = db.model('product')

xdescribe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const meme = {name: 'batman', price: 44, rating: 3}

    beforeEach(() => {
      return Product.create(meme)
    })

    it('GET /api/products works to get products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('Array')
      expect(res.body[0].name).to.be.equal('batman')
    })

    it('GET /api/products responds with all products in an array', async () => {
      const res2 = await request(app)
        .get('/api/products')
        .expect(200)
      expect(res2.body[0]).to.deep.include([])
    })
  })

  describe('/api/products/:id', () => {
    const meme = {name: 'batman', price: 44, rating: 3}

    beforeEach(() => {
      return Product.create(meme)
    })

    it('GET /api/products/1 responds with test product', async () => {
      const response = await request(app)
        .get('/api/products/1')
        .expect(200)
      expect(response.body).to.include(meme)
    })
  })
})
