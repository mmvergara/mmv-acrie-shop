import express from "express";
import isAuth from "../middleware/isAuth";
import { putSignup, postLogin, postLogout, patchChangeAvatar } from "../controllers/authController";

const router = express.Router();

router.put("/signup", putSignup);
router.post("/signin", postLogin);
router.post("/signout", postLogout);
router.patch("/changeavatar", isAuth, patchChangeAvatar);
export default router;
