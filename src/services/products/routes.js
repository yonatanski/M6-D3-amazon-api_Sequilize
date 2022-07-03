import { Router } from "express"
import { Op } from "sequelize"
import sequelize from "sequelize"
// import Product from "./model.js"
// import Review from "../Review/model.js"
import { ProductCategory, Category, Product, Review, User, Cart } from "../modelRelation.js"

const productsRouter = Router()

productsRouter.get("/", async (req, res, next) => {
  try {
    const { offset = 0, limit = 2 } = req.query
    const totalBlog = await Product.count({})

    const products = await Product.findAll({
      include: [Review, Category],
      offset,
      limit,
    })
    res.send({ totalBlog, products })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})
productsRouter.get("/search", async (req, res, next) => {
  try {
    if (req.query) {
      const query = req.query.q
      console.log("query", query)
      const products = await Product.findAll({
        where: {
          [Op.or]: [{ product_name: { [Op.iLike]: `%${query}%` } }, { product_description: { [Op.iLike]: `%${query}%` } }, { product_price: { [Op.between]: [req.query.from || 0, req.query.to || infinity] } }],
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
productsRouter.get("/stats", async (req, res, next) => {
  try {
    const stats = await Review.findAll({
      // select list : what you want to get ?
      attributes: [
        [
          sequelize.cast(
            // cast function converts datatype
            sequelize.fn("count", sequelize.col("product_id")), // SELECT COUNT(blog_id) AS total_comments
            "integer"
          ),
          "numberOfReviews",
        ],
      ],
      group: ["product_id", "product.id"],
      include: [{ model: Product }], // <-- nested include
    })
    res.send(stats)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Review, include: User }, Category],
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
    const { categoryId, ...rest } = req.body
    const newProduct = await Product.create(rest)

    if (newProduct) {
      await ProductCategory.create({
        categoryId: req.body.categoryId,
        productId: newProduct.id,
      })
    }
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
