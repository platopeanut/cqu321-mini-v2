export type StdOldResponse<T> = {
    Statue: number
    data: T
}

export function getImgUrl(url: string) {
    return 'https://picture.zhulegend.com' + url;
}

export function getMarkdownUrl(url: string) {
    return 'https://www.zhulegend.com' + url;
}