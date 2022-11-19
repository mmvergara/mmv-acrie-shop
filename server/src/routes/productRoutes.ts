import express from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getUserProducts,
} from "../controllers/productController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.put("/create", isAuth, addProduct);

router.delete("/delete/:prod_id", isAuth, deleteProductById);
router.get("/userproducts", isAuth, getUserProducts);
router.get("/all", getAllProducts);

export default router;
