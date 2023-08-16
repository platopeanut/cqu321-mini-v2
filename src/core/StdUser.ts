import type StdModel from "@/core/StdModel";
import {stdGetStorage, stdSetStorage} from "@/core/storage";
import {StdUserInfoError} from "@/core/error/StdUserInfoError";
import {userInfoLackCallback} from "@/utils/callback";

export type UserInfo = {
  uid: string       // 用户唯一id
  sid: string       // 学号
  auth: string      // 统一身份证号
  password: string  // 密码
  name: string      // 姓名
}

class StdUser implements StdModel {
  private _userInfo: UserInfo | null = null;
  public async getUserInfo(execCallback: boolean = true) {
    if (!this._userInfo) {
      try {
        this._userInfo = await stdGetStorage<UserInfo>("UserInfo")
      } catch (e) {
        if (execCallback) {
          await userInfoLackCallback();
          throw new StdUserInfoError(e);
        }
      }
    }
    return this._userInfo;
  }
  public async setUserInfo(info: UserInfo) {
    this._userInfo = info;
    await stdSetStorage("UserInfo", info);
  }
  public clear() { this._userInfo = null; }
}

export default new StdUser();
