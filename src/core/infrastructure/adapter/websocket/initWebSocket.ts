import { container } from "../../../../server/globalContainer";
import { Server } from "http";
import { WebSocketAdapter } from "./webSocket.adapter";

export function initWebSocket(httpServer: Server) {
  container.get<WebSocketAdapter>("WebSocketAdapter").initWebSocket(httpServer);
}
