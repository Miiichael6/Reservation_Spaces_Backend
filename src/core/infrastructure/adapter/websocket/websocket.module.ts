import { AsyncContainerModule } from "inversify";
import { WebSocketAdapter } from "./webSocket.adapter"

export const container = new AsyncContainerModule( async (bind) => {
    bind<WebSocketAdapter>("WebSocketAdapter").to(WebSocketAdapter)
});