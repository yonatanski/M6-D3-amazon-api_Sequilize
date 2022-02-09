import { Router } from "express";
import Author from "./model.js";

const authorsRouter = Router();

authorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await Author.findAll({});
    res.send(authors);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

authorsRouter.get("/:id", async (req, res, next) => {
  try {
    const singleAuthor = await Author.findByPk(req.params.id);
    if (singleAuthor) {
      res.send(singleAuthor);
    } else {
      res.status(404).send({ error: "No such author" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.send(newAuthor);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

authorsRouter.put("/:id", async (req, res, next) => {
  try {
    //
    const [success, updateAuthor] = await Author.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (success) {
      res.send(updateAuthor);
    } else {
      res.status(404).send({ message: "no such author" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    await Author.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default authorsRouter;
