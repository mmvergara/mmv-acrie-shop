import { Request as req, Response as res, NextFunction as next } from "express";
import newError from "../utilities/newError";
const isAuth = (req: req, res: res, next: next) => {
  if (!req.session.isLoggedIn) throw newError("Session Expired! Try loggin in again", 401);
  next();
};
export default isAuth;
