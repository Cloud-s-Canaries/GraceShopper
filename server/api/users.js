const router = require('express').Router()
const {User} = require('../db/models')

// const isAdminMiddleware = (req, res, next)=>{

//     if(!req.user.admin) console.log("you should not be doing that")
//     else next()

// }

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Get route to get info on a single user
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// Post route to add a user to the database
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// Put route to edit a product
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.send(user[1][0])
  } catch (error) {
    next(error)
  }
})

// Delete route to remove a user from database
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// // Login request - Unneeded cuz it's in /auth folder already
// router.put('/login', async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         email: req.body.email
//       }
//     })
//     if (!user) {
//       res.sendStatus(401)
//     }
//     if (user.correctPassword(req.body.password)) {
//       res.json(user)
//     } else {
//       res.send('Incorrect password')
//     }
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
