import express from "express";
import {
  decreaseProductQuantity,
  getUserCartByUserId,
  putProducttoCart,
} from "../controllers/cartProductController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.put("/add", isAuth, putProducttoCart);
router.get("/all", isAuth, getUserCartByUserId);
router.delete("/decrease", isAuth, decreaseProductQuantity);
router.delete("/delete", isAuth);

export default router;
