export async function userInfoLackCallback() {
    await uni.navigateTo({
        url: "/pages/user_info/index"
    });
    await uni.showToast({
        title: "用户未登录",
        icon: "error"
    });
}