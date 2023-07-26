const API = wx;

function request<T extends string | WechatMiniprogram.IAnyObject | ArrayBuffer>(option: WechatMiniprogram.RequestOption) {
    return new Promise<WechatMiniprogram.RequestSuccessCallbackResult<T>>((resolve, reject) => {
        API.request({
            ...option,
            success: result => { resolve(result as WechatMiniprogram.RequestSuccessCallbackResult<T>); },
            fail: err => { reject(err); }
        });
    });
}

function setStorage(option: WechatMiniprogram.SetStorageOption) {
    return new Promise<void>((resolve, reject) => {
        API.setStorage({
            ...option,
            success: () => { resolve(); },
            fail: err => { reject(err); }
        });
    });
}

function getStorage<T>(option: WechatMiniprogram.GetStorageOption) {
    return new Promise<T>((resolve, reject) => {
        API.getStorage({
            ...option,
            success: result => { resolve(result.data); },
            fail: err => {
                reject(`[getStorage] Not Found: ${JSON.stringify(option)}\n${JSON.stringify(err)}`);
            }
        });
    });
}

export default {
    request,
    login: API.login,
    setStorage,
    getStorage,
    clearStorage: API.clearStorage,
};
