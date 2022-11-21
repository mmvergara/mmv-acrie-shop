import express from "express";
import {
  decreaseProductQuantity,
  deleteProducttoCart,
  getUserCartByUserId,
  postCheckout,
  putProducttoCart,
} from "../controllers/cartProductController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.put("/add", isAuth, putProducttoCart);
router.get("/all", isAuth, getUserCartByUserId);
router.delete("/decrease", isAuth, decreaseProductQuantity);
router.delete("/delete", isAuth, deleteProducttoCart);
router.post("/checkout", isAuth, postCheckout);

export default router;
