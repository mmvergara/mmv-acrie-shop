import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.put("/create", isAuth, addProduct);
router.get("/all", getAllProducts);
export default router;
