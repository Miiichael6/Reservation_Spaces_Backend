/// <reference path="src/types/global.d.ts" />
import 'reflect-metadata';
import "dotenv/config"
import express from 'express';
import morgan from "morgan"
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { InversifyExpressServer } from 'inversify-express-utils';
import { initControllers } from './src/server/initControllers';
import { container , initContainers } from './src/server/globalContainer';
import { initWebSocket } from './src/core/infrastructure/adapter/websocket/initWebSocket';
import { initDatabase } from './src/core/infrastructure/database/initDatabase';
import { loadEntities } from './src/server/loadEntities';
import "colors"

async function bootstrap() {
    console.time("Server up")
    // const entities = await loadEntities()
    await initDatabase()
    await initContainers()
    await initControllers()
    const server = new InversifyExpressServer(container, null, { rootPath: `/api` });
    server.setConfig((app) => {
        app.use(express.json());
        app.use(morgan("dev"))
        app.use(cors({
            origin: JSON.parse(process.env.TEST_CORS as string),
            methods: ["GET",'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        app.use(express.static(path.join(__dirname, 'public')));
    });
    const app = server.build();
    const httpServer = createServer(app);
    initWebSocket(httpServer)
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT);
    console.table(`>> Server up at port http://127.0.0.1:${PORT} <<`.cyan);
    console.timeEnd("Server up")
}
bootstrap()