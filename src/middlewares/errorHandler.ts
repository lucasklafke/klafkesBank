import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "conflict") return res.status(409).send(err.message);
  if(err.type === "unauthorized") return res.status(401).send(err.message);
  if(err.message === "jwt expired") return res.status(401).send("token expired");
  if(err.type === "not_found") return res.status(404).send(err.message);


  //prisma
  // if(err.code === "P2002") return res.status(409).send(err.message)


  res.status(500).send(err.message || "Internal server error");
  next(err);
};