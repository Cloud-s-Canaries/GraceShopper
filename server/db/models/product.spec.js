/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  it('has field name, price, description, imagUrl, rating', async () => {
    const meme = await Product.create({
      name: 'spongebob',
      price: 3,
      description: 'yellow sponge guy',
      imageUrl: 'www.spongeguy.com',
      rating: 2.0
    })
    expect(meme.name).to.equal('spongebob')
    expect(meme.price).to.equal(3)
    expect(meme.description).to.equal('yellow sponge guy')
    expect(meme.imageUrl).to.equal('www.spongeguy.com')
    expect(meme.rating).to.equal(2.0)
  })

  it('name and price cannot be empty', async () => {
    const meme = Product.build({})
    try {
      await meme.validate()
      throw Error('validation should have failed with empty name and price')
    } catch (err) {
      expect(err.message).to.contain(
        'notNull Violation: product.name cannot be null'
      )
      expect(err.message).to.contain(
        'notNull Violation: product.price cannot be null'
      )
    }
  })

  // it('expect price to be a integer',async ()=> {
  //    const meme = Product.build({name: 'spiderman', price:5.656})
  //   try {
  //   await meme.validate()
  //    throw Error('validation should have failed with non integer in price')
  //    } catch (err) {
  //    expect(err.message).to.contain('hello')
  //    expect (Product.create({price:"1"}).to.be.rejected)
  // })

  it('expect Default Image Url if no image provided', async () => {
    const meme = Product.build({
      name: 'cat meme',
      price: 3
    })
    await meme.validate()
    expect(meme.imageUrl).to.be.a('string')
    expect(meme.imageUrl.length).to.be.greaterThan(1)
  })
})

// end describe('correctPassword')
//   }) // end describe('instanceMethods')
// }) // end describe('User model')
