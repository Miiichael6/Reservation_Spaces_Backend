import { controller, httpPost, request, requestBody, response, BaseHttpController } from "inversify-express-utils";
import { Response, Request } from "express";
import { inject } from "inversify";
import { endpoint } from "./config";
import { BOOKING_TYPES } from "./types";
import SaveOne from "../application/useCases/SaveOne";
import Find from "../application/useCases/Find";
import { authenticateToken } from "../../../core/infrastructure/jwt";

@controller(endpoint)
export class BookingController extends BaseHttpController {
  constructor(
    @inject(BOOKING_TYPES.SAVE_ONE) private readonly saveOne: SaveOne,
    @inject(BOOKING_TYPES.FIND) private readonly find: Find,
  ) {
    super();
  }

  @httpPost("/find", authenticateToken)
  async findUsers(@requestBody() body: any, @response() res: Response,@request() req: Request) {
    try {
      const user = req.user;
      return await this.find.exec(user);
    } catch (error: any) {
      res.status(400).send(error.detail ? error.detail : error);
    }
  }
  @httpPost("/saveOne", authenticateToken)
  async deleteOne(@requestBody() body: any, @response() res: Response, @request() req: Request) {
    try {
      const user = req.user;
      return await this.saveOne.exec(body, user);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}
