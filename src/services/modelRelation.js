import Category from "../Category/model.js"
import Product from "../products/model.js"
import Review from "../Review/model.js"
import User from "../user/model.js"

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

export { Category, Product, Review, User }
