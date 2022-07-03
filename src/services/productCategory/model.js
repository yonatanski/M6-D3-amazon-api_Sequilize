import { DataTypes } from "sequelize"

import sequelize from "../../utils/db/connect.js"

import Sequelize from "sequelize"

const ProductCategory = sequelize.define(
  "productCategory",
  {},
  {
    timestamps: false,
  }
)

export default ProductCategory
