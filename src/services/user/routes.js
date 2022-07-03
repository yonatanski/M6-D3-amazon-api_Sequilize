import { Router } from "express"
import { Op } from "sequelize"
import { ProductCategory, Category, Product, Review, User, Cart } from "../modelRelation.js"

const userRouter = Router()

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [Review],
    })
    res.send(users)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})
userRouter.get("/search", async (req, res, next) => {
  try {
    if (req.query) {
      const query = req.query.q
      console.log("query", query)
      const users = await User.findAll({
        where: {
          [Op.or]: [{ name: { [Op.iLike]: `%${query}%` } }, { lastName: { [Op.iLike]: `%${query}%` } }],
        },
        include: [Review],
      })
      res.send(users)
    } else {
      const users = await User.findAll({
        include: [Review],
      })
      res.send(users)
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

userRouter.get("/:id", async (req, res, next) => {
  try {
    const singleUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: Review,
    }) //findByPk(req.params.id)
    if (singleUser) {
      res.send(singleUser)
    } else {
      res.status(404).send({ error: "No such Product" })
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.send(newUser)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

userRouter.put("/:id", async (req, res, next) => {
  try {
    //
    const [success, updateUser] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    if (success) {
      res.send(updateUser)
    } else {
      res.status(404).send({ message: "no such Product" })
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

userRouter.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

export default userRouter
