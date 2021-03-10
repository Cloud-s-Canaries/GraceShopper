'use strict'

const db = require('../server/db')
const {User, Cart, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

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
    }),
    Product.create({
      name: 'trying young things',
      price: 250,
      description: 'How to appear cool',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/aXoYpwd_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    }),
    Product.create({
      name: 'Check the Bank',
      price: 1,
      description: 'If this meme is accurate and we hope you can afford it',
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/FOIV1c1Eq9Y1HQq-Sn1RgReLp0E=/0x0:735x500/920x613/filters:focal(310x192:426x308):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66727168/image.0.png ',
      rating: Math.floor(Math.random() * 5)
    }),
    Product.create({
      name: 'Downloading Video',
      price: 300,
      description: 'I wanna watch that so bad!',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/a1rQA5b_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    }),
    Product.create({
      name: 'Student things',
      price: 600,
      description: 'Hey you are going to be late!',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/aLpgK25_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    })
  ])

  const memes = [
    {
      name: 'Urine Test',
      price: 500,
      description: 'jus going in for an annual checkup',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/aRX3yXy_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Crew',
      price: 40,
      description: ' Lets roll doggos',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/anQMrWq_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Falling on Hard Times',
      price: 20,
      description: 'when you just need to kick back and relax',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/aGpjBW7_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Icy',
      price: 330,
      description: 'Bad Breath and Thirsty!',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/a27owAY_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'The Truth',
      price: 9990,
      description: 'why is this so accurate?',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/ayMXNQM_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Debuggin Like a boss',
      price: 450,
      description: 'How To Debug',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/a9EpX6D_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Batman',
      price: 250,
      description: 'Greatest Detective',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/arMbBRy_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'We Did It Guys',
      price: 20,
      description: 'How we may all be feeling',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/axM1mKb_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Ben ?',
      price: 1,
      description: ' Lofi is life',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/aO3rBV6_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'POSTMAN',
      price: 8000,
      description: 'Its a bird, no its a plane, no fool its POSTMAN!',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/av5LMAb_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'The 4 Horsemen of Coding',
      price: 600,
      description: 'How it feels to be a developer',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/aRXQLn2_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Pie Chart of Pain',
      price: 85,
      description: 'Lets put it all together',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/azMrOnm_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: "Envy at it's Finest",
      price: 123,
      description: 'Thank God for Autocomplete',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/aAbV71g_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Is Coding Really Hard?',
      price: 8,
      description: 'This about those who came before',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/amv3BO2_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    },
    {
      name: 'Happiness id Good',
      price: 45,
      description: 'When you are happy and u know it raise ur hand.',
      imageUrl: 'https://img-9gag-fun.9cache.com/photo/a1WjvgG_460swp.webp',
      rating: Math.floor(Math.random() * 5)
    }
  ]

  memes.forEach(async meme => {
    await Product.create(meme)
  })

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
