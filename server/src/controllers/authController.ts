import { Request as req, Response as res, NextFunction as next } from "express";
import { userModel } from "../models/userModel";
import { hash, compare } from "bcryptjs";
import { userInfo } from "../types";
import newError from "../utilities/newError";
import { loginSchema, signupSchema } from "./Validation/ValidationSchemas";

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: number;
  }
}

export const putSignup = async (req: req, res: res, next: next) => {
  const { username, email, password } = req.body;
  const { error } = signupSchema.validate(req.body);
  if (error) {
    next(newError("Invalid request", 422));
    return;
  }
  const encryptedPassword = await hash(password, 12);
  const sameEmail = userModel.findByEmail(email);
  const sameUsername = userModel.findByUsername(username);
  const [foundSameEmail, foundSameUsername] = await Promise.all([sameEmail, sameUsername]);
  try {
    console.log("===", foundSameEmail.rowCount, foundSameUsername.rowCount, "===");
    if (foundSameEmail.rowCount) throw newError("Email already exists", 422);
    if (foundSameUsername.rowCount) throw newError("Username already exists", 422);

    const newUser = new userModel({
      username,
      email,
      password: encryptedPassword,
      userpic_url: "https://i.ibb.co/KGdrLDJ/blank-profile-picture-g435c74535-640.png",
    });
    await newUser.save();
    console.log("User Saved");
    res.status(200).send({ statusCode: 200, message: "Account Created Successfully", ok: true });
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (req: req, res: res, next: next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate(req.body);
  if (error) {
    next(newError("Invalid request", 422));
    return;
  }

  const findingUser = await userModel.findByEmail(email);
  try {
    const foundUser = findingUser.rows[0] as userInfo;
    if (!foundUser) throw newError("Invalid email", 422);

    const passwordComparison = await compare(password, foundUser.password);
    if (!passwordComparison) throw newError("Invalid password", 422);
    const userData = {
      username: foundUser.username,
      userpic_url: foundUser.userpic_url,
      TOKEN_EXP_DATE: new Date(req.session.cookie.expires!).getTime(),
    };

    req.session.isLoggedIn = true;
    req.session.userId = foundUser.id;

    res
      .status(200)
      .send({ statusCode: 200, message: "Signed in successfully", ok: true, data: userData });
  } catch (error) {
    next(error);
  }
};

export const postLogout = async (req: req, res: res, next: next) => {
  req.session.destroy(() => {
    res
      .status(200)
      .send({ statusCode: 200, message: "Logged out successfully", ok: true, data: null });
  });
};

export const testAuth = async (req: req, res: res, next: next) => {
  res.status(200).send({ msg: "Goods you are logged in" });
};
