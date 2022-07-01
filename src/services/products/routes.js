import { Router } from "express"
import { Op } from "sequelize"
import Product from "./model.js"
import Review from "../Review/model.js"

const productsRouter = Router()

// productsRouter.get("/", async (req, res, next) => {
//   try {
//     const products = await Product.findAll({
//       include: [Review],
//     })
//     res.send(products)
//   } catch (error) {
//     res.status(500).send({ error: error.message })
//   }
// })
productsRouter.get("/search", async (req, res, next) => {
  try {
    if (req.query.q) {
      const query = req.query.q
      console.log("query", query)
      const products = await Product.findAll({
        where: {
          [Op.or]: [{ product_name: { [Op.iLike]: `%${query}%` } }, { product_description: { [Op.iLike]: `%${query}%` } }],
        },
        include: [Review],
      })
      res.send(products)
    } else {
      const products = await Product.findAll({
        include: [Review],
      })
      res.send(products)
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: Review,
    }) //findByPk(req.params.id)
    if (singleProduct) {
      res.send(singleProduct)
    } else {
      res.status(404).send({ error: "No such Product" })
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

productsRouter.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.send(newProduct)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

productsRouter.put("/:id", async (req, res, next) => {
  try {
    //
    const [success, updateProduct] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    if (success) {
      res.send(updateProduct)
    } else {
      res.status(404).send({ message: "no such Product" })
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default productsRouter
