const router = require('express').Router()
const {User} = require('../db/models')

function isAdmin(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (req.user) {
      if (req.user.admin) {
        next()
      }
    } else {
      res.status(403).send('Sorry, admins only party here. Go away')
    }
  } else {
    next()
  }
}

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    if (!users) {
      res.status(404).json(`There are no users in the database.`)
    }
    if (users) {
      res.status(200).json(users)
    }
  } catch (err) {
    next(err)
  }
})

// Get route to get info on a single user
router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      res.status(404).json(`This user is not in the database.`)
    }
    if (user) {
      res.status(200).json(user)
    }
  } catch (error) {
    next(error)
  }
})

// Post route to add a user to the database
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
})

// Put route to edit a user
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.update(
      {
        email: req.body.email,
        password: req.body.password
      },
      {
        where: {
          id: req.params.id
        },
        returning: true
      }
    )
    console.log('user-----------', user)
    if (!user[0]) {
      console.log('user not found-----------')
      res.status(404).json(`Cannot update a user that is not in the database.`)
    }
    if (user[0]) {
      console.log('user found-----------')
      res.status(204).json(user[1][0])
    }
  } catch (error) {
    next(error)
  }
})

// Delete route to remove a user from database
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      res.status(404).json(`Cannot delete a user that is not in the database`)
    }
    if (user) {
      await user.destroy()
      res.status(204).json(user)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
