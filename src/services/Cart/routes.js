import { Router } from "express"
import { Op } from "sequelize"
import sequelize from "sequelize"

import { ProductCategory, Category, Product, Review, User, Cart } from "../modelRelation.js"

const cartRouter = Router()
cartRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Cart.findAll({})

    res.send(categories)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// cartRouter.get("/search", async (req, res, next) => {
//   try {
//     if (req.query) {
//       const query = req.query.q
//       console.log("query", query)
//       const categories = await Cart.findAll({
//         where: {
//           [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
//         },
//         include: [Review],
//       })
//       res.send(categories)
//     } else {
//       const categories = await Cart.findAll({
//         include: [Review],
//       })
//       res.send(categories)
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message })
//   }
// })
cartRouter.get("/:userId", async (req, res, next) => {
  try {
    const categories = await Cart.findAll({
      include: [{ model: Product }],
      attributes: ["productId", [sequelize.fn("count", sequelize.col("cart.id")), "unitQty"], [sequelize.fn("sum", sequelize.col("product.product_price")), "unitTotalPrice"]],

      group: ["productId", "product.id"],

      where: { userId: req.params.userId },
    })

    const totalQty = await Cart.count({
      where: {
        userId: req.params.userId,
      },
    })

    const totalSum = await Cart.sum("product.product_price", {
      include: { model: Product, attributes: [] },
    })
    res.send({ categories, totalQty, totalSum })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// cartRouter.get("/:id", async (req, res, next) => {
//   try {
//     const singlCart = await Cart.findOne({
//       where: {
//         id: req.params.id,
//       },
//     }) //findByPk(req.params.id)
//     if (singlCart) {
//       res.send(singlCart)
//     } else {
//       res.status(404).send({ error: "No such Product" })
//     }
//   } catch (error) {
//     res.status(500).send({ error: error.message })
//   }
// })

cartRouter.post("/:productId/:userId", async (req, res, next) => {
  try {
    const { userId, productId } = req.params
    const newCart = await Cart.create({ userId, productId })
    res.send(newCart)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

// cartRouter.put("/:id", async (req, res, next) => {
//   try {
//     //
//     const [success, updateCart] = await Cart.update(req.body, {
//       where: { id: req.params.id },
//       returning: true,
//     })
//     if (success) {
//       res.send(updateCart)
//     } else {
//       res.status(404).send({ message: "no such Product" })
//     }
//   } catch (error) {
//     res.status(500).send({ message: error.message })
//   }
// })

cartRouter.delete("/:productId/:userId", async (req, res, next) => {
  try {
    const { userId, productId } = req.params
    await Cart.destroy({
      where: {
        userId,
        productId,
      },
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default cartRouter
