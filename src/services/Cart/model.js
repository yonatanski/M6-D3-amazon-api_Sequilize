import { DataTypes } from "sequelize"

import sequelize from "../../utils/db/connect.js"

import Sequelize from "sequelize"

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
})

export default Cart
