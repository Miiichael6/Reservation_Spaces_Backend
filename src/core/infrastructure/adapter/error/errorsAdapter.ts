import { injectable } from "inversify";
interface iResponseError {
    response: any, code: number, message: string
}
@injectable()
export class ErrorsAdapter {
    responseError: any;
    constructor () {}

    run(error: any): iResponseError {
        if(error instanceof Error) return this.validateError(error)
        console.log(error)
        return { response: error, code: 500, message: error.message ?? "" };
    }

    private validateError(error: Error) {
        return this.responseError = { 
            message: error.message ?? "unknow error", 
            code: 400,
            response: error ?? null,
        }
    }
}