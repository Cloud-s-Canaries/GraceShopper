'use strict'

const db = require('../server/db')
const {User, Cart, Product} = require('../server/db/models')
const faker = require('faker')

function generateProducts() {
  const products = []
  for (let i = 0; i <= 100; i++) {
    products.push({
      name: faker.random.words(),
      price: faker.random.number(),
      description: faker.commerce.productDescription(),
      rating: Math.floor(Math.random() * 5)
    })
  }
  console.log(`Seeding products`)
  products.forEach(async productItem => {
    await Product.create(productItem)
  })
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  generateProducts()

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({
      email: 'admin@email.com',
      password: 'password123',
      admin: true
    })
  ])

  const product = await Promise.all([
    Product.create({
      name: 'test_meme',
      price: 1002,
      description: 'A test to see if our things work',
      rating: 3.6
    }),
    Product.create({
      name: 'second_test_meme',
      price: 6200,
      description: 'A second test item to see if our things work',
      rating: 4.6
    })
  ])

  const cart = await Promise.all([
    Cart.create({productId: 1, userId: 1, quantity: 3})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`Seeded ${product.length} users`)
  console.log(`Seeded ${cart.length} carts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
