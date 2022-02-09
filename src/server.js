import express from "express";

import cors from "cors";

import { testConnection } from "./utils/db/connect.js";
import productsRouter from "./services/product/product.route.js";

const server = express();

server.use(express.json());

server.use(cors());

server.use("/products", productsRouter);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log("✅ Server is running on port: ", port);
  testConnection();
});

server.on("error", (err) =>
  console.log(`Server is not running due to : ${err}`)
);
