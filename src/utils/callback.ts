// 互斥锁：保证多个call同时处理时只有第一个执行，后面的直接拒绝
let isLock = false;
export async function userInfoLackCallback() {
    if (isLock) return;
    isLock = true;
    await uni.navigateTo({
        url: "/pages/settings/login/index"
    });
    await uni.showToast({
        title: "用户未登录",
        icon: "error"
    });
    isLock = false;
}