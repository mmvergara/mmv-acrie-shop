import { Request as req, Response as res, NextFunction as next } from "express";
import { userModel } from "../models/userModel";
import { hash, compare } from "bcryptjs";
import { userInfo } from "../types";
import newError from "../utilities/newError";

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: number;
  }
}

export const putSignup = async (req: req, res: res, next: next) => {
  console.log("SIGNUp");
  const { username, email, password } = req.body;
  const encryptedPassword = await hash(password, 12);

  const newUser = new userModel({ username, email, password: encryptedPassword });
  const saveResult = await newUser.save();
  console.log(saveResult);
  res.status(200).send({ msg: "registered" });
};

export const postLogin = async (req: req, res: res, next: next) => {
  const { email, password } = req.body;
  const findingUser = await userModel.findByEmail(email);
  try {
    const foundUser = findingUser.rows[0] as userInfo;
    if (!foundUser) throw newError("User does not Exists", 422);
    const passwordComparison = await compare(password, foundUser.password);
    if (!passwordComparison) throw newError("Wrong Password", 422);

    const userData = {
      username: foundUser.username,
      userpic_url: foundUser.userpic_url,
      TOKEN_EXP_DATE:new Date(req.session.cookie.expires!).getTime()
    };
    req.session.isLoggedIn = true;
    req.session.userId = foundUser.id;
    res
      .status(200)
      .send({ statusCode: 200, message: "Signed in successfully", ok: true, userData });
  } catch (error) {
    next(error);
  }
};

export const testAuth = async (req: req, res: res, next: next) => {
  res.status(200).send({ msg: "Goods you are logged in" });
};
