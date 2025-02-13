import { Request, Response, NextFunction } from "express";
import { User } from "../../../modules/users/domain/User.entity";

export function authenticateToken (req: Request, res: Response, next: NextFunction){
    const tokenHeader = req.header("Authorization")?.split(" ")[1];
    if (!tokenHeader) {
      res.status(401).send("Token no proporcionado");
      return;
    }
    try {
      const userByToken = this.verifyJsonWebToken(tokenHeader) as Partial<User>;
      req.user = userByToken;
      next();
    } catch (error) {
      res.status(401).send("Token inválido");
    }
  }