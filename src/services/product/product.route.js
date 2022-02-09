import { Router } from "express";
import pool from "../../utils/db/connect.js";

const productsRouter = Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const productCreateResponse = await pool.query(
      "INSERT INTO product(name,description,brand,image_url,price,category) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      Object.values(req.body)
    );
    res.status(201).send(productCreateResponse.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const getProductsResponse = await pool.query("SELECT * FROM product");
    res.status(201).send(getProductsResponse.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const getProductsResponse = await pool.query(
      "SELECT * FROM product WHERE product_id=$1",
      [req.params.id]
    );
    const getReviewsResponse = await pool.query(
      "SELECT * FROM review WHERE product_id=$1",
      [req.params.id]
    );
    const product = getProductsResponse.rows[0];
    if (product) {
      res.status(201).send({ ...product, reviews: getReviewsResponse.rows });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM product WHERE product_id=$1", [
      req.params.id,
    ]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
/**
 *
 *  const sampleObject = { name: 'iphone',price:10 }  --> Object.entries(sampleObject) --> [ [ 'name', 'iphone' ] ,[price,10]]
 */
productsRouter.put("/:id", async (req, res, next) => {
  try {
    const valuesInTheBody = Object.values(req.body);
    const numberOfValues = valuesInTheBody.length;
    const updateStatement = Object.entries(req.body)
      .map(([key, value], i) => `${key}=$${i + 1}`)
      .join(",");
    const query = `UPDATE product SET ${updateStatement} WHERE product_id=$${
      numberOfValues + 1
    } RETURNING *;`;
    const updateResult = await pool.query(query, [
      ...valuesInTheBody,
      req.params.id,
    ]);
    res.status(201).send(updateResult.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// reviews
productsRouter.post("/:id/review", async (req, res, next) => {
  try {
    const reviewCreateResponse = await pool.query(
      "INSERT INTO review(comment,rate,product_id) VALUES($1,$2,$3) RETURNING *",
      [...Object.values(req.body), req.params.id]
    );
    res.status(201).send(reviewCreateResponse.rows[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
productsRouter.delete("/:id/review/:reviewId", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM review WHERE review_id=$1", [
      req.params.reviewId,
    ]);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default productsRouter;
