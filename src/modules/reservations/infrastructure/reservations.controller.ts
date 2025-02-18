import { controller, httpPost, request, requestBody, response, BaseHttpController } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { endpoint } from "./config";
import { RESERVATION_TYPES } from "./types";
import SaveOne from "../application/useCases/SaveOne";
import Find from "../application/useCases/Find";
import UpdateOne from "../application/useCases/UpdateOne";
import { authenticateToken } from "../../../core/infrastructure/jwt";

@controller(endpoint)
export class ReservationController extends BaseHttpController {
  constructor(
    @inject(RESERVATION_TYPES.SAVE_ONE) private readonly saveOne: SaveOne,
    @inject(RESERVATION_TYPES.FIND) private readonly find: Find,
    @inject(RESERVATION_TYPES.UPDATE_ONE) private readonly updateOne: UpdateOne,
  ) {
    super();
  }

  @httpPost("/find", authenticateToken)
  async findReservation(@requestBody() body: any, @response() res: Response, req: Request) {
    try {
      return await this.find.exec(req.user);
    } catch (error: any) {
      res.status(400).send(error.detail ? error.detail : error);
    }
  }
  @httpPost("/updateOne")
  async updateOneReservation(@requestBody() body: any, @response() res: Response) {
    try {
      return await this.updateOne.exec(body);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  @httpPost("/saveOne", authenticateToken)
  async saveOneReservation(@requestBody() body: any, @response() res: Response, @request() req: Request) {
    try {
      const userLogged = req.user;
      return await this.saveOne.exec(body, userLogged);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
