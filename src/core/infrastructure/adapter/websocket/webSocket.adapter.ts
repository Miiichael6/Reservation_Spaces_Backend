import { Socket, Server } from "socket.io";
import { Server as httpServer } from "http";

export class WebSocketAdapter {
    private websocket!: Server;

    initWebSocket(httpServer: httpServer) {
        const io = new Server(httpServer, {
            transports: ["websocket"],
        })
        this.websocket = io;
        this.initConnection();
    }

    initConnection() {
        if(!this.websocket) return console.log("Websocket not initialized...");
        this.websocket.on("connection", (socket: Socket) => {
            console.log(">> WebSocket connected succesfully <<".black);
            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    }


}