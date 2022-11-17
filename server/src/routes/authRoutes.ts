import express from "express";
import isAuth from "../middleware/isAuth";
import { putSignup, postLogin, testAuth, postLogout } from "../controllers/authController";

const router = express.Router();

router.put("/signup", putSignup);
router.post("/signin", postLogin);
router.post("/signout", postLogout);

router.get("/testauth", isAuth, testAuth);
export default router;
