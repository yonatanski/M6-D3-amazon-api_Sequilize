import { Router } from "express"
import { Op } from "sequelize"
import Category from "./model.js"
import Product from "./model.js"
import Review from "../Review/model.js"

const categoryRouter = Router()

categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll({})
    res.send(categories)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})
categoryRouter.get("/search", async (req, res, next) => {
  try {
    if (req.query) {
      const query = req.query.q
      console.log("query", query)
      const categories = await Category.findAll({
        where: {
          [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }],
        },
        include: [Review],
      })
      res.send(categories)
    } else {
      const categories = await Category.findAll({
        include: [Review],
      })
      res.send(categories)
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

categoryRouter.get("/:id", async (req, res, next) => {
  try {
    const singlCategory = await Category.findOne({
      where: {
        id: req.params.id,
      },
    }) //findByPk(req.params.id)
    if (singlCategory) {
      res.send(singlCategory)
    } else {
      res.status(404).send({ error: "No such Product" })
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

categoryRouter.post("/", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body)
    res.send(newCategory)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

categoryRouter.put("/:id", async (req, res, next) => {
  try {
    //
    const [success, updateCategory] = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    if (success) {
      res.send(updateCategory)
    } else {
      res.status(404).send({ message: "no such Product" })
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

categoryRouter.delete("/:id", async (req, res, next) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default categoryRouter
