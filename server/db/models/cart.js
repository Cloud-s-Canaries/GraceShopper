const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define(
  'cart',
  {
    quantity: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      }
    }
  },
  {
    timestamps: false
  }
)

module.exports = Cart
