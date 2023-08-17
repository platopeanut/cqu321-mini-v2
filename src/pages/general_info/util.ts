export type InfoWay = "网站" | "网站（校园网）" | "小程序" | "公众号";

export function getInfoWayStyle(infoWay: InfoWay) {
    if (infoWay === "网站") return "bg-green";
    if (infoWay === "网站（校园网）") return "bg-olive";
    if (infoWay === "小程序") return "bg-blue";
    if (infoWay === "公众号") return "bg-cyan";
    return "bg-grey";
}