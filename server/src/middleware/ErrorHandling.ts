import { Request as req, Response as res, NextFunction as next } from "express";

const ErrorHandling = (error: Error, req: req, res: res, next: next) => {
  //@ts-ignore
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong in our server";
  res.status(status).json({ statusCode:status, message, ok: false });
};


export default ErrorHandling 