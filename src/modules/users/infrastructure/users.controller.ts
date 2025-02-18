import { controller, httpPost, request, requestBody, response, BaseHttpController } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { endpoint } from "./config";
import { USER_TYPES } from "./types";
import SaveOne from "../application/useCases/SaveOne";
import Find from "../application/useCases/Find";
import UpdateOne from "../application/useCases/UpdateOne";
import Login from "../application/useCases/Login";
import { User } from "../domain/User.entity";
import { loginDto } from "../domain/dtos/login.dto";
import GetLoggedUser from "../application/useCases/GetLoggedUser";
import { authenticateToken } from "../../../core/infrastructure/jwt";
import { QueryFailedError } from "typeorm";

@controller(endpoint)
export class UsersController extends BaseHttpController {
  constructor(
    @inject(USER_TYPES.SAVE_ONE) private readonly saveOne: SaveOne,
    @inject(USER_TYPES.FIND) private readonly find: Find,
    @inject(USER_TYPES.UPDATE_ONE) private readonly updateOne: UpdateOne,
    @inject(USER_TYPES.LOGIN) private readonly login: Login,
    @inject(USER_TYPES.GET_LOGGED_USER) private readonly getLoggedUser: GetLoggedUser,
  ) {
    super();
  }

  @httpPost("/register")
  async createUser(@requestBody() body: User, @response() res: Response, @request() req: Request) {
    try {
      return await this.saveOne.exec(body);
    } catch (error: any) {
      return this.validateErrors(error, req, res)
    }
  }

  @httpPost("/login")
  async loginUser(@requestBody() body: loginDto, @response() res: Response, @request() req: Request) {
    try {
      return await this.login.exec(body);
    } catch (error: any) {
      this.validateErrors(error, req, res)
    }
  }

  @httpPost("/logged-user", authenticateToken)
  async getUser(@response() res: Response, @request() req: Request) {
    try {
      const userLogged = await this.getLoggedUser.exec(req);
      return userLogged;
    } catch (error: any) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  @httpPost("/find")
  async findUsers(@requestBody() body: any, @response() res: Response,@request() req: Request) {
    try {
      console.log(req.user);
      return await this.find.exec();
    } catch (error: any) {
      this.validateErrors(error, req, res)
    }
  }
  @httpPost("/updateOne")
  async deleteOne(@requestBody() body: any, @response() res: Response) {
    try {
      return await this.updateOne.exec(body);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  validateErrors(error: any, req: Request, res: Response) {
    // console.log(error);
    if(error instanceof QueryFailedError) {
      return res.status(404).send({ 
        message: error.message,
        detail: error.driverError.detail as string
      })
    }
    res.status(500).send(error);
  }
}
