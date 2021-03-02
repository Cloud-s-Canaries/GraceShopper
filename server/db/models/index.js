const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// const itemsToBuy = db.define(
//   'itemsToBuy',
//   {
//     quantity: {
//       type: Sequelize.INTEGER,
//     },
//   },
//   {timestamps: false}
// )
// User has one shopping cart
// User.hasOne(Cart)
// Cart belongs to user
// Cart.belongsTo(User)

// Products belong to shopping carts
// Product.belongsToMany(Cart, {through: 'itemsToBuy'})
// Carts have many products
// Cart.belongsToMany(Product, {through: 'itemsToBuy'})

User.belongsToMany(Product, {through: 'cart'})
Product.belongsToMany(User, {through: 'cart'})

// No relation between product and users other than through cart.

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Product
}
