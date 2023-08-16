import type {StdRequestOptions, StdResponse} from "@/core/network";
import {stdRequest} from "@/core/network";


export async function stdRequestHelper<ResType>(options: {
    requestOptions: StdRequestOptions
    showLoading?: boolean
    showError?: boolean
    loadingText?: string
}) {
    if (options.showLoading)
        await uni.showLoading({ title: options.loadingText || "" });
    try {
        const res = await stdRequest<ResType>(options.requestOptions);
        if (options.showLoading) uni.hideLoading();
        return res;
    } catch (e: any) {
        if (options.showLoading) uni.hideLoading();
        if (options.showError) await stdShowErrorToast(e);
        return null;
    }
}

export async function stdShowErrorToast<T>(res: UniApp.RequestSuccessCallbackResult) {
    let text = '';
    if (res.statusCode !== 200) text += `【${res.statusCode}】`;
    const response = res.data as StdResponse<any>;
    if (response.status === 0) text += ` ${response.msg}`;
    await uni.showToast({ title: text, icon: "none" });
}