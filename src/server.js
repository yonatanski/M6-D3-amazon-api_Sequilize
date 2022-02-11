import express from "express"
import productsRouter from "./services/products/routes.js"
import reviewsRouter from "./services/Review/routes.js"
import { authenticateDatabase } from "./utils/db/connect.js"

const server = express()

const { PORT = 7000 } = process.env

server.use(express.json())

server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)

server.listen(PORT, () => {
  authenticateDatabase()
  console.log(`Server is listening on port ${PORT}`)
})

server.on("error", (error) => {
  console.log(`Server is stopped : ${error}`)
})
