export type StdOldResponse<T> = {
    Statue: number
    data: T
}

export type OldRequestOptions = {
    url: string
    data?: any
}

export const OLD_URL = 'https://www.zhulegend.com/321CQU';

export function getImgUrl(url: string) {
    return 'https://picture.zhulegend.com' + url;
}

export function getMarkdownUrl(url: string) {
    return 'https://www.zhulegend.com' + url;
}

export async function oldRequestV1(options: OldRequestOptions) {
    const res = await uni.request({
        url: OLD_URL + options.url,
        method: "POST",
        data: { ...options.data, Key: 'CQUz5321' }
    });
    if (res.statusCode !== 200) throw res;
    const response: any = res.data;
    if (response.Statue !== 1) throw res;
    return response;
}