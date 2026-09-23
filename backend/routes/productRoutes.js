import express from "express";
import {
  addStock,
  createNewProduct,
  createProduct,
  createReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();

router.route("/add").post(protect, admin, singleUpload, createNewProduct);
router.route("/").post(protect, admin, createProduct).get(getProducts);

router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById) //user
  .put(protect, admin, singleUpload, updateProduct) //admin //user multer for file upload
  .delete(protect, admin, deleteProduct); //admin

router.route("/:id/reviews").post(protect, createReview);

router.route("/:id/stock").put(addStock);
export default router;
