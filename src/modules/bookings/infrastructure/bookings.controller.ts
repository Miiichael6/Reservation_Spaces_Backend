import { controller, httpPost, request, requestBody, response, BaseHttpController } from "inversify-express-utils";
import { Response, Request } from "express";
import { inject } from "inversify";
import { endpoint } from "./config";
import { BOOKING_TYPES } from "./types";
import { authenticateToken } from "../../../core/infrastructure/jwt";
import SaveOne from "../application/useCases/SaveOne";
import Find from "../application/useCases/Find";
import FindBookingsInfo from "../application/useCases/FindBookingsInfo";
import { ErrorsAdapter } from "../../../core/infrastructure/adapter/error/errorsAdapter";

@controller(endpoint)
export class BookingController extends BaseHttpController {
  constructor(
    @inject(BOOKING_TYPES.SAVE_ONE) private readonly saveOne: SaveOne,
    @inject(BOOKING_TYPES.FIND) private readonly find: Find,
    @inject(BOOKING_TYPES.FIND_BOOKINGS_INFO) private readonly findBookingsInfo: FindBookingsInfo,
    @inject("ErrorsAdapter") private readonly errorsAdapter: ErrorsAdapter
  ) { super(); }

  @httpPost("/find", authenticateToken)
  async findBookings(@requestBody() body: any, @response() res: Response,@request() req: Request) {
    try {
      const user = req.user;
      return await this.find.exec(user);
    } catch (error: any) {
      res.status(400).send(error.detail ? error.detail : error);
    }
  }
  @httpPost("/find-bookings-info", authenticateToken)
  async findBoookingsInfo(@requestBody() body: any, @response() res: Response,@request() req: Request) {
    try {
      const user = req.user;
      return await this.findBookingsInfo.run(user);
    } catch (error: any) {
      res.status(400).send(error.detail ? error.detail : error);
    }
  }
  @httpPost("/saveOne", authenticateToken)
  async deleteOne(@requestBody() body: any, @response() res: Response, @request() req: Request) {
    try {
      const user = req.user;
      return await this.saveOne.exec(body, user);
    } catch (item_error: any) {
      const response = this.errorsAdapter.run(item_error);
      if(response.code === 500) return res.status(response.code).send(response);
      return res.status(response.code).send(response)
    }
  }
}
