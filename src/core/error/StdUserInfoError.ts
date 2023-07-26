import {StdError} from "./StdError";

export class StdUserInfoError extends StdError {
  constructor(errMsg: any) { super("User Info Lack: " + errMsg); }
}
