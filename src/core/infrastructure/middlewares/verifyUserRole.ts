import { NextFunction, Request, Response } from "express";

export function verifyUserRole (req: Request, res: Response, next: NextFunction){
    try {
      const isAdmin = req.user.role.includes("admin")
      if(!isAdmin) throw new Error("you don't have permission to ask for this api, you need to be administrator")
      next();
    } catch (error) {
      res.status(401).send(error.message);
    }
  }