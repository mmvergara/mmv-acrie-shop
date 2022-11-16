import { Request as req, Response as res, NextFunction as next } from "express";
import { userModel } from "../models/userModel";

export const putSignup = async (req: req, res: res, next: next) => {
  console.log('SIGNUp')
  const { username, email, password } = req.body;
  const newUser = new userModel({ username, email, password });
  const saveResult = await newUser.save();
  console.log(saveResult);
  res.status(200).send({ msg: "registered" });
};

