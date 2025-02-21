import { AsyncContainerModule } from "inversify";
import { ErrorsAdapter } from "./errorsAdapter"

export const container = new AsyncContainerModule( async (bind) => {
    bind<ErrorsAdapter>("ErrorsAdapter").to(ErrorsAdapter)
});