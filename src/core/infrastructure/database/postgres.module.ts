import { AsyncContainerModule } from "inversify";
import { AppDataSource } from "./postgres.config";
import { DataSource } from "typeorm";

export const container = new AsyncContainerModule( async (bind) => {
    bind<DataSource>(`PgRepository`).toConstantValue(AppDataSource)
});

