import express from "express"
import listEndpoints from "express-list-endpoints"
import cartRouter from "./services/Cart/routes.js"
import categoryRouter from "./services/Category/routes.js"
import productsRouter from "./services/products/routes.js"
import reviewsRouter from "./services/Review/routes.js"
import userRouter from "./services/user/routes.js"
import { authenticateDatabase } from "./utils/db/connect.js"

const server = express()

const { PORT = 7000 } = process.env

server.use(express.json())

server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)
server.use("/users", userRouter)
server.use("/categories", categoryRouter)
server.use("/cart", cartRouter)

server.listen(PORT, async () => {
  await authenticateDatabase()
  console.table(listEndpoints(server))
  console.log(`Server is listening on port ${PORT}`)
})

server.on("error", (error) => {
  console.log(`Server is stopped : ${error}`)
})
