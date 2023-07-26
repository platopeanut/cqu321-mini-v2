import StdModel from "./StdModel";
import {stdGetStorage, stdSetStorage} from "./storage";

export type TokenInfo = {
  token: string
  tokenExpireTime: number
}

export type RefreshTokenInfo = {
  refreshToken: string
  refreshTokenExpireTime: number
}

class StdToken implements StdModel {
  private _tokenInfo: TokenInfo = {token: "", tokenExpireTime: -1};
  public get tokenInfo() { return this._tokenInfo; }
  public set tokenInfo(info: TokenInfo) {
    this._tokenInfo = info;
    // console.log("TokenInfo", this._tokenInfo);
  }
  public async getRefreshTokenInfo() { return await stdGetStorage<RefreshTokenInfo>("RefreshTokenInfo"); }
  public async setRefreshTokenInfo(info: RefreshTokenInfo) { await stdSetStorage("RefreshTokenInfo", info); }
}

export default new StdToken();
