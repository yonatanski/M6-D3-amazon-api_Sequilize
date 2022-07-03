import Category from "./Category/model.js"
import Product from "./products/model.js"
import Review from "./Review/model.js"
import User from "./user/model.js"
import ProductCategory from "./productCategory/model.js"
import Cart from "./Cart/model.js"

// Proudct - Review --> on to many relationship

Product.hasMany(Review, {
  onDelete: "CASCADE",
})

Review.belongsTo(Product, {
  onDelete: "CASCADE",
})

// User  - Review --> one to many relationship

User.hasMany(Review, { onDelete: "CASCADE" })
Review.belongsTo(User, { onDelete: "CASCADE" })

// Category  - Product --> many to many relationship

Category.belongsToMany(Product, { through: ProductCategory, onDelete: "CASCADE" })
Product.belongsToMany(Category, { through: ProductCategory, onDelete: "CASCADE" })

// User  - Cart --> one to many relationship

User.hasMany(Cart, { onDelete: "CASCADE" })
Cart.belongsTo(User, { onDelete: "CASCADE" })

// Product  - Cart --> one to many relationship

Product.hasMany(Cart, { onDelete: "CASCADE" })
Cart.belongsTo(Product, { onDelete: "CASCADE" })

export { Category, ProductCategory, Product, Review, User, Cart }
