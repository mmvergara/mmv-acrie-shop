import express from "express";
import { putSignup, postLogin, testAuth } from "../controllers/authController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.put("/signup", putSignup);
router.post("/signin", postLogin);

router.get("/testauth", isAuth, testAuth);
export default router;
