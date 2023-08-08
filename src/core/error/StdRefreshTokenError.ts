import {StdError} from "@/core/error/StdError";

export class StdRefreshTokenError extends StdError {
    constructor(errMsg: any) { super("Refresh Token Lack: " + errMsg); }
}
