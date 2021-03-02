const router = require('express').Router()
const {User} = require('../db/models')

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
