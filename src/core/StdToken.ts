import StdModel from "@/core/StdModel";
import {stdGetStorage, stdSetStorage} from "@/core/storage";
import {StdRefreshTokenError} from "@/core/error/StdRefreshTokenError";
import {userInfoLackCallback} from "@/utils/callback";

export type TokenInfo = {
  token: string
  tokenExpireTime: number
}

export type RefreshTokenInfo = {
  refreshToken: string
  refreshTokenExpireTime: number
}

class StdToken extends StdModel {
  private _tokenInfo: TokenInfo = {token: "", tokenExpireTime: -1};
  public get tokenInfo() { return this._tokenInfo; }
  public set tokenInfo(info: TokenInfo) {
    this._tokenInfo = info;
    // console.log("TokenInfo", this._tokenInfo);
  }
  public async getRefreshTokenInfo() {
    try {
      return await stdGetStorage<RefreshTokenInfo>("RefreshTokenInfo");
    } catch (e) {
      await userInfoLackCallback();
      throw new StdRefreshTokenError(e);
    }
  }
  public async setRefreshTokenInfo(info: RefreshTokenInfo) { await stdSetStorage("RefreshTokenInfo", info); }
  public clear() { this._tokenInfo = {token: "", tokenExpireTime: -1}; }
}

export default new StdToken();
