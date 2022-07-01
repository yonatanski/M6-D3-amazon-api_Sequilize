import { DataTypes } from "sequelize"

import sequelize from "../../utils/db/connect.js"

import Sequelize from "sequelize"

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://i.pravatar.cc/300",
      validate: {
        isURL: true,
      },
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { underscored: true }
)

export default Product
