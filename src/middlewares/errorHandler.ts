import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)
  if (err.type === "conflict") return res.status(409).send(err.message);
  if(err.type === "unauthorized") return res.status(401).send(err.message);
  if(err.message === "jwt expired") return res.status(401).send("token expired");
  if(err.type === "notFound") return res.status(404).send(err.message);
  res.status(500).send("Internal server error");
  next(err);
};