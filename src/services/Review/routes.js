import { Router } from "express"
import Product from "../products/model.js"
import { Op } from "sequelize"
import Review from "./model.js"

const reviewsRouter = Router()
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const data = await Review.findAll({
      include: Product,
    })
    res.send(data)
  } catch (e) {
    console.log(e)
    next(e)
  }
})
reviewsRouter.post("/", async (req, res, next) => {
  try {
    const data = await Review.create(req.body)
    res.send(data)
  } catch (error) {
    res.status(500).send({ message: error.message })
    console.log(error)
    // next(e)
  }
})

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const data = await Review.findOne({
      where: {
        id: req.params.id,
      },
      include: Product,
    })
    if (data) {
      res.send(data)
    } else {
      res.send({ message: `${req.params.id} not found` })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})
reviewsRouter.put("/:id", async (req, res, next) => {
  try {
    const data = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })

    res.send(data[1][0])
  } catch (e) {
    console.log(e)
    next(e)
  }
})
reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    const data = await Review.destroy({
      where: {
        id: req.params.id,
      },
    })

    res.send({ rows: data, message: "Data deleted" })
  } catch (e) {
    console.log(e)
    next(e)
  }
})
Product.hasMany(Review, { onDelete: "CASCADE" })
Review.belongsTo(Product, { onDelete: "CASCADE" })

export default reviewsRouter
