import { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import User from "../models/User";
import {IUser} from "../types";

export interface AnyRequest extends Request {
  user: HydratedDocument<IUser> | null;
}

const access = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as AnyRequest;

  const token = req.get('Authorization');

  if (!token) {
    req.user = null;
  } else {
    const user = await User.findOne({token});

    if (!user) {
      return res.status(401).send({error: "Wrong token"});
    }
    req.user = user;
  }

  return next();
};

export default access;