import type StdModel from "@/core/StdModel";
import {stdGetStorage, stdSetStorage} from "@/core/storage";
import {StdUserInfoError} from "@/core/error/StdUserInfoError";

export type UserInfo = {
  uid: string       // 用户唯一id
  sid: string       // 学号
  auth: string      // 统一身份证号
  password: string  // 密码
  name: string      // 姓名
}

class StdUser implements StdModel {
  private _userInfo: UserInfo | null = null;
  public async getUserInfo() {
    if (!this._userInfo) {
      try {
        this._userInfo = await stdGetStorage<UserInfo>("UserInfo")
      } catch (e) {
        throw new StdUserInfoError(e);
      }
    }
    return this._userInfo;
  }
  public async setUserInfo(info: UserInfo) {
    this._userInfo = info;
    await stdSetStorage("UserInfo", info);
  }
}

export default new StdUser();
