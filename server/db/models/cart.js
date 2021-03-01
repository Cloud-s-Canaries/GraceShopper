const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  items: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Cart
