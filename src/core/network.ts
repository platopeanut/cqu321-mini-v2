import stdToken, {type TokenInfo} from "@/core/StdToken";
import stdUser, {type UserInfo} from "@/core/StdUser";

const BASE_URL = 'https://api.321cqu.com/v1';

export type StdResponse<T> = {
  status: number
  msg: string
  data: T
};

export type RequestMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
export type StdRequestOptions = {
  url: string
  data?: any
  method?: RequestMethod
  needToken?: boolean
}
export async function stdRequest<ResType> (options: StdRequestOptions) {
  // SET DEFAULT
  if (options.data === undefined) options.data = {};
  if (options.method === undefined) options.method = "POST";
  if (options.needToken === undefined) options.needToken = true;

  let header: any = {};
  if (options.needToken) {
    const tokenInfo = await handleToken();
    header["Authorization"] = "Bearer " + tokenInfo.token;
  }
  const res = await uni.request({
    url: BASE_URL + options.url,
    method: options.method,
    header: header,
    data: options.data
  });
  if (res.statusCode !== 200) { throw res; }
  const response = res.data as StdResponse<ResType>;
  if (response.status !== 1) { throw res; }
  return response.data;
}

async function getToken(username: string, password: string) {
  const info = await stdRequest<{
    token: string
    refreshToken: string
    tokenExpireTime: number
    refreshTokenExpireTime: number
  }>({
    url: "/authorization/login",
    data: {
      "apiKey": "koZfU+HGTNXRjxhSQiYpTQ==",
      "applyType": "WX_Mini_APP",
      "username": username,
      "password": password
    },
    needToken: false
  });
  await stdToken.setRefreshTokenInfo({
    refreshToken: info.refreshToken,
    refreshTokenExpireTime: info.refreshTokenExpireTime
  });
  stdToken.tokenInfo = {
    token: info.token,
    tokenExpireTime: info.tokenExpireTime
  };
}

async function updateToken() {
  stdToken.tokenInfo = await stdRequest<TokenInfo>({
    url: "/authorization/refreshToken",
    data: { "refreshToken": (await stdToken.getRefreshTokenInfo()).refreshToken },
    needToken: false
  });
}

async function handleToken() {
  // 如果当前的token没有过期则直接返回
  if (checkTokenExpireTime(stdToken.tokenInfo.tokenExpireTime))
    return stdToken.tokenInfo;
  // 如果refreshToken不存在或者过期，则先获取
  const refreshToken = await stdToken.getRefreshTokenInfo()
  if (!refreshToken || !checkTokenExpireTime(refreshToken.refreshTokenExpireTime)) {
    // 如果StuInfo信息缺失则抛出异常
    // if (StdUserInfoError.test()) throw new StdUserInfoError();
    const info = await stdUser.getUserInfo();
    await getToken(info.auth, info.password);
  }
  else await updateToken();
  return stdToken.tokenInfo;
}

async function userValidate() {
  await stdUser.setUserInfo(await stdRequest<UserInfo>({ url: "/edu_admin_center/validateAuth" }));
}

export async function login(username: string, password: string) {
  await getToken(username, password);
  await userValidate();
}

export async function bindOpenID() {
  const res = await uni.login();
  await stdRequest({
    url: "/notification/bindOpenId",
    data: {
      "uid": (await stdUser.getUserInfo()).uid,
      "code": res.code
    }
  });
}

// 判断token是否过期, true没有过期, false过期
function checkTokenExpireTime(expireTime: number, date=new Date()) {
  return expireTime - date.getTime() / 1000 > 0;
}
