import express from "express";

import {
  addProducts,
  getProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "./utils.js";

const app = express();
app.use(express.json());

app.get("/products", async (req, res) => {
  const products = await getProducts();
  res.send({ count: products.length, data: products });
});

app.post("/products", async (req, res) => {
  const product = await addProducts(req.body);
  res.status(201).send({ status: "success", data: product });
});

app.put("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = req.body;
  const oldProduct = await getProduct(pid);
  if (oldProduct) {
    await updateProduct(product, pid);
    res.send({ status: "success", data: product });
  } else {
    res.send({ status: "error", msg: `product not found with id:${pid}` });
  }
});

app.patch("/", async (req, res) => {
  res.send("replace products");
});

app.delete("/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await getProduct(pid);
  if (product) {
    await removeProduct(pid);
    res.send({ status: "success", msg: "product removed" });
  } else res.send({ status: "error", msg: `product not found with id:${pid}` });
});

app.listen(3000, () => {
  console.log("Server is running...");
});
