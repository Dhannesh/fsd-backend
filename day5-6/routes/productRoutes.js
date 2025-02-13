import express from "express";
import {
  addProduct,
  getAllProducts,
  getProduct,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";

const productRoutes = express.Router();

productRoutes.route("/").get(getAllProducts).post(addProduct);
productRoutes
  .route("/:id")
  .get(getProduct)
  .delete(removeProduct)
  .patch(updateProduct);

export default productRoutes;
