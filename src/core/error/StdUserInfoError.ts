import {StdError} from "@/core/error/StdError";

export class StdUserInfoError extends StdError {
  constructor(errMsg: any) { super("User Info Lack: " + errMsg); }
}
